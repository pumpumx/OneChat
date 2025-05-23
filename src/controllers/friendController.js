import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Friend } from "../models/friend.model.js";
import { User } from '../models/user.model.js'

const sendFriendRequest = asyncHandler(async (req, res) => {

    const user = req.user;

    if (!user) throw new ApiError(401, [{ status: 401, message: "User unauthorized" }])

    const { friendUsername } = req.body
    if (!friendUsername) throw new ApiError(400, [{ status: 400, message: "No username Provided" }])

    const filteredUsername = friendUsername.trim().toLowerCase()
    if (filteredUsername === '') throw new ApiError(400, "No username Provided", [{ status: 400, message: "Enter a username" }])

    const receiverUser = await User.findOne({ username: filteredUsername }).select('_id username')

    if (!receiverUser) throw new ApiError(404, `No user with username ${filteredUsername} found`, [{ status: 404, message: `No user with username ${filteredUsername} found` }])

    if (receiverUser._id.equals(user._id)) {
        throw new ApiError(400, [{ status: 400, message: "You cannot send a friend request to yourself" }]);
    }

    const existingRequest = await Friend.findOne({
        $or: [
            { userId: user._id, friendId: receiverUser._id },
            { userId: receiverUser._id, friendId: user._id }
        ]
    });

    if (existingRequest) {
        if (existingRequest.status === 'Pending') {
            throw new ApiError(400, [{ status: 400, message: "Request already sent" }])
        }
        else if (existingRequest.status === 'Accepted') {
            throw new ApiError(400, [{ status: 400, message: "You are already friends" }])
        }
    }

    const friendRequestForReciever = new Friend({
        userId: receiverUser._id,
        friendId: user._id,
        status: 'Pending'
    })

    const friendRequestForSender = new Friend({
        userId: user._id,
        friendId: receiverUser._id,
        status: 'Pending'
    })

    await friendRequestForReciever.save()
    await friendRequestForSender.save()


    return res
        .status(200)
        .json(
            new ApiResponse(200, "Friend Request Sent Successfully", { friendRequestForReciever })
        )

})

const fetchPendingRequest = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) throw new ApiError(400, [{ status: 400, message: "User Unauthorized" }])

    const allPendingRequest = await Friend.aggregate([
        {
            $match: { userId: user._id, status: 'Pending' }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'friendId',
                foreignField: '_id',
                as: 'friendDetails'
            }
        },
        {
            $unwind: "$friendDetails"
        },
        {
            $project: {
                _id: 1,
                status: 1,
                username: "$friendDetails.username",
            }
        }
    ])

    if (!allPendingRequest) throw new ApiError(400, [{ status: 400, message: "Error Fetching Pending Requests" }])

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Pending Request Fetched Successfully", { allPendingRequest })
        )
})

const friendRequestStatus = asyncHandler(async (req, res) => {
    const user = req.user //Pupi is the user
    if (!user) throw new ApiError(400, [{ status: 400, message: "User Unauthorized" }])

    const { responseFromUser, usernameOfUserWhoSentFriendRequest } = req.body //Pupuman is the one who sent request

    if (!usernameOfUserWhoSentFriendRequest) throw new ApiError(400, "No Response from User", [{ status: 400, message: "No response from user" }])

    const requestSenderData = await User.findOne({ username: usernameOfUserWhoSentFriendRequest }).select("_id username")

    if (responseFromUser === false) {
        await Friend.updateMany({
            $or: [
                { userId: user._id ,  friendId: requestSenderData._id },
                { userId: requestSenderData._id , friendId: user._id }
            ]
        },
            {
                $set: { status: "Rejected" }
            },
        )
        return res
            .status(200)
            .json(
                new ApiResponse(200, { message: "Request Rejected" })
            )
    }

    if (responseFromUser === true) {
         await Friend.updateMany({
            $or: [
                { userId: user._id , friendId: requestSenderData._id },
                { userId: requestSenderData._id ,  friendId: user._id }
            ]
        },
            {   
                $set: { status: "Accepted" }
            })
            return res
            .status(200)
            .json(
                new ApiResponse(200, {status:200, message: "Request Accepted" })
            )
    }

    throw new ApiError(400,"Malformed request Sent")

})

export {
    sendFriendRequest,
    fetchPendingRequest,
    friendRequestStatus
}
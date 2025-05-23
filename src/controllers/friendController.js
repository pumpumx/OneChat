import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Friend } from "../models/friend.model.js";
import { User } from '../models/user.model.js'
import validator from 'validator'
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
                { userId: user._id, friendId: requestSenderData._id },
                { userId: requestSenderData._id, friendId: user._id }
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
                { userId: user._id, friendId: requestSenderData._id },
                { userId: requestSenderData._id, friendId: user._id }
            ]
        },
            {
                $set: { status: "Accepted" }
            })
        return res
            .status(200)
            .json(
                new ApiResponse(200, { status: 200, message: "Request Accepted" })
            )
    }

    throw new ApiError(400, "Malformed request Sent")

})

const fetchAcceptedFriendList = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) throw new ApiError(400, [{ status: 400, message: "Unauthorized Access" }])

    const friendList = await Friend.aggregate([
        {
            $match: { userId: user._id, status: 'Accepted' }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'friendId',
                foreignField: '_id',
                as: 'FriendList'
            }
        },
        {
            $unwind: '$FriendList'
        },
        {
            $project: {
                username: '$FriendList.username'
            }
        }
    ])

    if (!friendList) throw new ApiError(400, [{ status: 400, message: "No Friend Found" }])

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Friend List Fetched Successfully", { friendList })
        )

})

const removeFriend = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) throw new ApiError(400, [{ status: 400, messaage: "User Unauthorized" }])

    const { friendUsername } = req.body
    if (!friendUsername || !validator.isAlphanumeric(friendUsername)) throw new ApiError(400, [{ status: 400, messaage: "Friend to be removed not found" }])

    const friendId = await User.find({ username: friendUsername }).select("_id")
    if (!friendId) throw new ApiError(400, `No friend with ${friendUsername} username exists `)

    const checkExistingFriendShip = await Friend.findOne({
        $or: [
            { userId: user._id, friendId: friendId },
            { userId: friendId, friendId: user._id }
        ]
    })

    if (!checkExistingFriendShip) {
        throw new ApiError(403, [{ status: 403, message: "You are not authorized to remove this friend or friendship does not exist" }]);
    }

    const removeYourFriend = await Friend.deleteMany({
        $or: [
            { userId: user._id, friendId: friendId },
            { userId: friendId, friendId: user._id }
        ]
    })
    if (!removeYourFriend || removeFriend.deletedCount == 0 ) throw new ApiError(400, [{ status: 400, message: "Unable to remove your friend" }])

    //Here will call the remove chat function to remove all chat details
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Friend Removed Successfully")
        )

})
export {
    sendFriendRequest,
    fetchPendingRequest,
    friendRequestStatus,
    fetchAcceptedFriendList,
    removeFriend
}
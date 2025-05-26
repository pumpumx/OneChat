import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Friend } from "../models/friend.model.js";
import { User } from '../models/user.model.js'
import validator from 'validator';
import { FriendChat } from "../models/friendChat.model.js";

const sendFriendRequest = asyncHandler(async (req, res) => {

    const user = req.user;

    if (!user) throw new ApiError(401, [{ message: "User unauthorized" }])

    const { friendUsername } = req.body

    if (!friendUsername) throw new ApiError(400, [{ status: 400, message: "No username Provided" }])

    const filteredUsername = friendUsername.trim().toLowerCase()
    if (filteredUsername === '') throw new ApiError(400, "No username Provided", [{ message: "Enter a username" }])

    const receiverUser = await User.findOne({ username: filteredUsername }).select('_id username')
    if (!receiverUser) throw new ApiError(404, `No user with username found`, [{ message: `No user with username found` }])

    if (receiverUser._id.equals(user._id)) {
        throw new ApiError(400, "You cannot send request to yourself", [{ message: "You cannot send a friend request to yourself" }]);
    }

    const existingRequest = await Friend.findOne({
        $or: [
            { userId: user._id, friendId: receiverUser._id },
            { userId: receiverUser._id, friendId: user._id }
        ]
    });

    if (existingRequest) {
        if (existingRequest.status === 'Pending') {
            throw new ApiError(400, "Request sent", [{ status: 400, message: "Request already sent" }])
        }
        else if (existingRequest.status === 'Accepted') {
            throw new ApiError(400, "you are already friends", [{ message: "You are already friends" }])
        }
    }

    const friendRequestForReciever = new Friend({
        userId: receiverUser._id,
        friendId: user._id,
        status: 'Pending'
    })


    await friendRequestForReciever.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Friend Request Sent Successfully", { friendRequestForReciever })
        )

})

export const fetchPendingRequestCoreLogic = async (userId) => {

    if (!userId) throw new ApiError(400, [{ status: 400, message: "User Unauthorized" }])

    const allPendingRequest = await Friend.aggregate([
        {
            $match: { userId: userId, status: 'Pending' }
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
                usernames: '$friendDetails.username'
            }
        }
    ])
    return allPendingRequest;
}

const fetchPendingRequest = asyncHandler(async (req, res) => {
    const user = req.user;

    const allPendingRequest = await fetchPendingRequestCoreLogic(user._id)

    if (!allPendingRequest) throw new ApiError(400, [{ status: 400, message: "Error Fetching Pending Requests" }])

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Pending Request Fetched Successfully", { allPendingRequest })
        )
})

const friendRequestAction = asyncHandler(async (req, res) => {
    const user = req.user //Pupi is the user
    if (!user) throw new ApiError(400, [{ status: 400, message: "User Unauthorized" }])

    console.log("fetching pending request")
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

        const pendingFreindRequestValidation = await fetchPendingRequestCoreLogic(user._id)

        console.log("pending", pendingFreindRequestValidation)

        const requestBool = pendingFreindRequestValidation.map((val) => {
            const usernameAvailable = val.username
            if (usernameAvailable === usernameOfUserWhoSentFriendRequest.trim()) {
                return true;
            }
        }) || null

        if (!requestBool) throw new ApiError(400, "You cant be friends with anyone", [{ messaage: "Trying to be friends with any user??? Desperation?? No one wants to be your friend??  Can't happen sweetheart!! Muah." }])

        const friendRequestForReciever = new Friend({
            userId: requestSenderData._id,
            friendId: user._id,
            status: 'Accepted'
        })

        await friendRequestForReciever.save()

        await Friend.findOneAndUpdate({
            $and: [{ userId: user._id }, { friendId: requestSenderData._id }]
        },
            {
                $set: { status: "Accepted" }
            })


        const creatingUsersPersonalChat = FriendChat(
            {
                participants: [
                    user._id, requestSenderData._id
                ]
            }
        )

        await creatingUsersPersonalChat.save()

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
                username: '$FriendList.username',
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
    if (!friendUsername && !validator.isAlphanumeric(friendUsername)) throw new ApiError(400, [{ status: 400, messaage: "Friend to be removed not found" }])

    const friend = await User.findOne({ username: friendUsername }).select("_id")
    if (!friend) throw new ApiError(400, `No friend with ${friendUsername} username exists `)

    const friendId = friend._id
    if(friendId.equals(user._id)) throw new ApiError(400 , "You cannot remove yourself")

    const checkExistingFriendShip = await Friend.findOne({
        $or: [
            { userId: user._id, friendId: friendId },
            { userId: friendId, friendId: user._id }
        ]
    })

    if (!checkExistingFriendShip) {
        throw new ApiError(403, [{ status: 403, message: "You are not authorized to remove this friend or friendship does not exist" }]);
    }

    const [removeYourFriend, removeThereChat] = await Promise.all([
        Friend.deleteMany({
            $or: [
                { userId: user._id, friendId: friendId },
                { userId: friendId, friendId: user._id }
            ]
        }),
        FriendChat.deleteMany({
           participants: {$all : [user._id , friendId]},
           $expr : {$eq : [{$size: "$participants"},2]}
        })
    ]);

    if (!removeYourFriend || removeYourFriend.deletedCount == 0)
        throw new ApiError(400, [{ status: 400, message: "Unable to remove your friend" }]);

    if (!removeThereChat || removeThereChat.deletedCount == 0)
        throw new ApiError(400, [{ status: 400, message: "Unable to remove your friend" }]);

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Friend Removed Successfully")
        )

})




export {
    sendFriendRequest,
    fetchPendingRequest,
    friendRequestAction,
    fetchAcceptedFriendList,
    removeFriend
}
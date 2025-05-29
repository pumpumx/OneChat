import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Chat } from "../models/chat.model.js";
import jwt from 'jsonwebtoken'
import { FriendChat } from "../models/friendChat.model.js";
import { Friend } from "../models/friend.model.js";
import validator from 'validator'
import { User } from "../models/user.model.js";
const saveRoomMessages = asyncHandler(async (req, res) => {
    //This thing can be expensive !! Change the logic as the database grows. probably save the message to redis and then save it to database after some time , maybe idk!.. 
    const { userMessage } = req.body;
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === "") throw new ApiError(400, "Mesaage not recieved")

    const user = req.user;
    if (!user) throw new ApiError(400, "User Invalid", [{ message: "User Invalid" }])

    const roomName = "TestRoom" //Change this static value if add room feature is added , for the time being just one room !! 

    const updateMessageWithUsernameIncluded = `${user.username} : ${userMessage}`

    const chatRoomUpdate = await Chat.findOneAndUpdate({ roomName }, {
        $push: { roomMessages: updateMessageWithUsernameIncluded }
    })

    if (!chatRoomUpdate) throw new ApiError(400, "Chat room does not exist.", [{ message: "Chat room does not exist." }])

    return res
        .status(200)
        .json(
            new ApiResponse(200, "message synced with database", { status: "True", message: "message synced with database" })
        )
})

const loadRoomMessages = asyncHandler(async (req, res) => {
    //Verify JWT ie user
    //Create an array and load the chat from the chat database!! 

    const roomName = "TestRoom" //This is temporary roomName , future update when user would like to create his own room , get value from user!!! 

    const chatRoom = await Chat.findOne({ roomName }) //Find return an array findOne return a document
    if (!chatRoom) throw new ApiError(401, "Chat Room Not Found", [{ status: "Failed", message: "Chat Room Dosen't exists." }])

    const previousRoomMessages = chatRoom.roomMessages;
    console.log("prev", previousRoomMessages)

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Previous messages fetched Successfully", { message: previousRoomMessages })
        )
})

const createNewRoom = asyncHandler(async (req, res) => {
    //Used to create a temp Room 
    const { roomName } = req.body;

    if (roomName.trim() === '') throw new ApiError(400, [{ status: 400, message: "Enter a roomName" }])
    const message = `Welcome to ${roomName}`

    const createRoom = await Chat.create({
        roomName: roomName,
        roomMessages: message
    })

    await createRoom.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, `Room created with room name ${roomName}`)
        )

})



const savePersonalChatMessage = asyncHandler(async (req, res) => { //Must add delay like message batching in order to handle multiple api request 

    const user = req.user

    const { friendName, messageFromSender } = req.body //For further improvement remove single message with array of messages if you think to integrate redis!!!
    if(!messageFromSender) throw new ApiError(400 , "No message found to save")
        
    if (!friendName || !validator.isAlphanumeric((friendName))) throw new ApiError(400, "Friend Name not provided")

    const friendId = await User.findOne({ username: friendName }).select("_id")
    if (!friendId) throw new ApiError(400, "No such user is your friend , trying to make random friends ???")

    const thereChat = await FriendChat.findOneAndUpdate(
        { participants: { $all: [user._id, friendId._id] }, },
        {
            $push: {    
                messages: {
                    sender: user._id,
                    content: messageFromSender,
                }
            }
        },
        {new:true}
    )

    console.log("there chat" , thereChat)
    if (!thereChat) throw new ApiError(400, "Error saving the chat!!")

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Message Saved Successfully")
        )

})

const fetchPersonalChatMessage = asyncHandler(async (req, res) => {
    const user = req.user
    const { friendName } = req.body 

    if (!friendName || !validator.isAlphanumeric((friendName))) throw new ApiError(400, "Friend Name not provided")
    const friendId = await User.findOne({ username: friendName }).select("_id")
    if (!friendId) throw new ApiError(400, "No such user is your friend , trying to make random friends ???")

    const personalMessages = await FriendChat.findOne( { participants: { $all: [user._id, friendId._id] } }).populate({
        path:"messages.sender",
        select:"username -_id"
    }).select("messages -_id")
    console.log("personal" , personalMessages)
    if (!personalMessages) throw new ApiError(400, "unable to fetch Personal messages")

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User Chat Fetched Successfully", { personalMessages})
        )

})

const socketAuth = asyncHandler(async (req, res) => {
    const user = req.user;
    const socketToken = jwt.sign({
        _id: user.id,
        username: user.username,
        email: user.email,
    },
        process.env.SOCKET_AUTH_SECRET,
        { expiresIn: "10m" }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, 'Socket verified', { socketToken })
        )
})
export {
    socketAuth,
    savePersonalChatMessage,
    fetchPersonalChatMessage,
    createNewRoom,
    saveRoomMessages,
    loadRoomMessages,
}
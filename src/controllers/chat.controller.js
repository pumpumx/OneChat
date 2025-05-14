import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Chat } from "../models/chat.model.js";
import jwt from 'jsonwebtoken'
const loadRoomMessages = {
    //Verify JWT 
    //Create an array and load the chat from the chat database!! 



}


async function createTempRoom(){
    const roomName = "TestRoom"
    const message = "Hey this is a test message"

    const createRoom = await Chat.create({
        roomName: roomName,
        roomMessages: message
    })

    await createRoom.save();
}


const createRoom = asyncHandler(async(req , res)=>{
    
})

const socketAuth = asyncHandler(async(req , res) => {
    const user = req.user;
    const socketToken = jwt.sign({
        _id : user.id,
        username : user.username,
        email : user.email,
    },
    process.env.SOCKET_AUTH_SECRET,
    {expiresIn: "10m"}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200 , 'Socket verified' , {socketToken})
    )
})
export {
    socketAuth,
    createTempRoom
}
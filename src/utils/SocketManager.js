import {io} from 'socket.io-client'
import { ApiError } from './apiError';

let socket = null;

const connectUser  = async (serverUrl)=>{
    
    if(!socket || !socket.connected){
        socket = io(`${serverUrl}`)

        socket.on('connect' , ()=>{
            console.log("User Connected with ID: " , socket.id)
        })

        socket.on('connect_error' , (err)=>{
            console.log("Error Connecting User" , err)
        })
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200 , "Client Connected" , {socketId: socket.id})
    )
}

const getSocket = ()=>{
    if(!socket || !socket.connected){
        throw new ApiError(400 , "Error getting Socket")
    }

    return socket
}

export {
    connectUser,
    getSocket
}
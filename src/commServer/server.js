import {Server} from "socket.io";
import { ApiError } from "../utils/apiError.js";
import { handleMessages } from "./messageHandler.js";
import jwt from 'jsonwebtoken'
let userSocketMap = new Map()
let io;
const serverInstance = async function(){
    try {
        io =  new Server(process.env.SERVERPORT,{
            cors:{
                origin:"*",
                credentials:true,
                methods: ['GET','POST']
            }
        })

        console.log("Socket io server running at port " , process.env.SERVERPORT)

        if(!io) throw new ApiError(500 , "Failed to initialise a server" , [{status:500,message:"Failed to initialise server"}])
            
        io.on('connection',(socket)=>{
            console.log("User Connected with id" ,socket.id)

            const socketToken = socket.handshake.auth.token
            
            console.log("socketToken " , socketToken)
        
            const user =  jwt.verify(socketToken , process.env.SOCKET_AUTH_SECRET)

            handleMessages(socket , io , user)

            socket.on('disconnect' , ()=>{
                for(let [uId , sId] of userSocketMap.entries()){
                    if(sId === socket.id){
                        userSocketMap.delete(uId);
                    }
                }
            })
        })  

    } catch (error) {
        throw new ApiError(500 , " Server error while establishing server" , [{message:"Failed to create socketIo server"}])
}}


export {
    serverInstance,
    userSocketMap,
    io
}

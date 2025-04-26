import app from "../app.js";
import {Server, Socket } from "socket.io";
import { ApiError } from "../utils/apiError.js";

const serverInstance = async function(){
    const port = process.env.SERVERPORT
    try {
        const io =  new Server(port, {
            cors:{
                origin:'*',
                methods:['GET' , 'POST'],
                credentials:'TRUE'
            }
        })
        if(!io) throw new ApiError(500 , "Failed to initialise a server" , [{status:500,message:"Failed"}])
        console.log("Server connection successful at port " , port)

        io.on("connection",(socket)=>{
            console.log("Client Connected Id: ",socket.id)
        })
    } catch (error) {
        throw new ApiError(500 , " Server error while establishing server" , error)
    }
}
export {
    serverInstance,
}

import { asyncHandler } from "../utils/asyncHandler.js";
import { io } from "./server.js";
import { User } from "../models/user.model.js";
const handleMessages = (socket , io , user)=>{
   
        socket.on('send_message' ,(data)=>{

            const updatedMessage = `${user.username} : ${data}`
            
            console.log("Message recieved" , updatedMessage)
            
            io.emit("recieve_data" , updatedMessage)
        })    

    socket.on('send_private' , async({to , data})=>{

        socket.to(to).emit("recieve_private" , {
            from: socket.id,
            data
        })
    }),

    socket.on('disconnect' , ()=>{
        console.log(`User ${socket.id} disconnected`)
    })
}
    

export {
    handleMessages
}
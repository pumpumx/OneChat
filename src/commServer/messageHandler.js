import { asyncHandler } from "../utils/asyncHandler.js";
import { io } from "./server.js";
const handleMessages = (socket , io)=>{
   
        socket.on('send_message' ,(data)=>{
            console.log("Message recieved" , data)
            io.emit("recieve_data" , data)
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
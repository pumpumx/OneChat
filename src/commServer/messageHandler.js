import { asyncHandler } from "../utils/asyncHandler.js";
const handleMessages = asyncHandler(async (socket , io)=>{
    socket.on('send_message' , async(data)=>{
        console.log("Message recieved" , data)
        io.emit('recieve_message' , data)
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
})


export {
    handleMessages
}
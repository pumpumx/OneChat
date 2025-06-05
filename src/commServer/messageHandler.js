    import { userSocketMap } from "./server.js";
    const handleMessages = (socket, io, user) => {
        try {
            socket.on('send_message', (data) => {

                const updatedMessage = `${user.username} : ${data}`

                console.log("Message recieved", updatedMessage)

                io.emit("recieve_data", updatedMessage)
            })

            socket.on('send_private', ({ data, usernameToWhomMessageWillBeSent }) => { //This function takes handles private messaging !!  
                    const recipientSocket = userSocketMap.get(usernameToWhomMessageWillBeSent)
                    console.log("recipientSocker" , recipientSocket)
                    io.to(recipientSocket).emit("recieve_private", {data:data})
                    //Add message batching here later on in order to improve performance 
            })
                socket.on('disconnect', () => {
                    console.log(`User ${socket.id} disconnected`)
                })

        } catch (error) {
            console.log("Error at handle Messages", error)
        }
    }


    export {
        handleMessages
    }
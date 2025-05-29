
    import { ApiError } from "../utils/apiError.js";
    import { userSocketMap } from "./server.js";
    const handleMessages = (socket, io, user) => {

        try {
            socket.on('send_message', (data) => {

                const updatedMessage = `${user.username} : ${data}`

                console.log("Message recieved", updatedMessage)

                io.emit("recieve_data", updatedMessage)
            })

            socket.on('send_private', ({ data, usernameToWhomMessageWillBeSent }) => { //This function takes handles private messaging !! 

                if(!usernameToWhomMessageWillBeSent) throw new ApiError(404, "Can't send data because no username exists")
                    
                    let p2p;
                    const updatedMessage = `${user.username} : ${data}`

                    for(let [uId , sId] of userSocketMap.entries()){
                        if(uId === usernameToWhomMessageWillBeSent){
                            p2p = sId
                        } 
                    }

                    io.to(p2p).emit("recieve_private", {updatedMessage})
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
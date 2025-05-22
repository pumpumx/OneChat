import { clientSocket } from "./useServer.js";
import { chatHistory } from "../atoms/chatAtom.js";
import { store } from "../atoms/store.js";
import { chat } from "../auth_api/chat.auth.js";

const sendMessage = async (data) => {
    await chat.saveRoomMessage({ userMessage: data })
    if (clientSocket && clientSocket.connected) {
        clientSocket.emit("send_message", (data))
        // Need to work on it tomorrow !!  //Lol i forgot what i had to work on it.
    }
    else {
        console.log("User Not Connected")
    }
}

const sendPrivateMessage = async (data,usernameToWhomMessageWillBeSent) =>{
    console.log("sendPrivate" , usernameToWhomMessageWillBeSent)
    if(clientSocket && clientSocket.connected){
        await clientSocket.emit('send_private',{data,usernameToWhomMessageWillBeSent})
    }
    
}

const recieveMessage = () => {
    try {
        if (clientSocket || clientSocket.connected) {

            clientSocket.on("recieve_data", (message) => {

                console.log("Message from server", message)

                const prev = store.get(chatHistory)
                const updated = [...prev, message]
                console.log("updated array ", updated)
                store.set(chatHistory, updated)
                //Function call of saving the messages to database should be made here when the message has been emitted!

            })
        }
    } catch (error) {
        console.log("Failed to recieve message", error)
    }
}

const recievePrivateMessage = ()=>{
    if(clientSocket || clientSocket.connected){
        clientSocket.on('recieve_private',(privateMessage)=>{
            console.log("PrivateMessage" , privateMessage)
        })
    }
}

export {
    sendMessage,
    recieveMessage,
    sendPrivateMessage,
    recievePrivateMessage
}
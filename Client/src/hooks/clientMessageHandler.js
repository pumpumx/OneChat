import { clientSocket } from "./useServer";
import { chatHistory } from "../atoms/chatAtom";
import { store } from "../atoms/store.js";

const sendMessage = (data , username)=>{
    console.log("data" , data)
    
    if(clientSocket && clientSocket.connected){
        clientSocket.emit("send_message" , ({data , username}))
    }
    else{
        console.log("User Not Connected")
    }
}

const recieveMessage = ()=>{
    if(clientSocket || clientSocket.connected ){

        clientSocket.on("recieve_data" , (message)=>{

            console.log("Message from server" , message)

            const prev = store.get(chatHistory)
            const updated = [...prev, message]
            console.log("updated array " , updated)
            store.set(chatHistory , updated)

        })
    }
}   

export {
    sendMessage,
    recieveMessage
}
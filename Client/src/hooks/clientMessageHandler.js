import { clientSocket } from "./useServer";
import { chatHistory } from "../atoms/chatAtom";
import { store } from "../atoms/store.js";
import { chat } from "../auth_api/chat.auth.js";

const sendMessage = async (data)=>{
    console.log("data" , data)
    
    if(clientSocket && clientSocket.connected){
        clientSocket.emit("send_message" , (data))
        await chat.saveRoomMessage(data)
    }
    else{
        console.log("User Not Connected")
    }
}

const recieveMessage = ()=>{
    try {
        if(clientSocket || clientSocket.connected ){
    
            clientSocket.on("recieve_data" , (message)=>{
    
                console.log("Message from server" , message)
                
                const prev = store.get(chatHistory)
                const updated = [...prev, message]
                console.log("updated array " , updated)
                store.set(chatHistory , updated)
    
                //Function call of saving the messages to database should be made here when the message has been emitted!
                
            })  
        }
    } catch (error) {
        console.log("Failed to recieve message" , error)
    }
}   

export {
    sendMessage,
    recieveMessage
}
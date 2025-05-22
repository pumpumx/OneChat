import axios from "axios";

class chatApi{
    constructor(data){
        this.data = data;
    }

    async loadRoomMessage(){
        try {
            const response = await axios.get("http://localhost:3000/api/v1/chat/load-room-messages",{
                withCredentials:true
            })
            console.log("loadMessageResponse" , response)

            return response;
        } catch (error) {
            console.log("error")
            return error.data.message.message
        }
    }

    async handleFriendRequest(){
        try {
            const response = 
        } catch (error) {
            console.log("error",error)
        }
    }
    async  saveRoomMessage(userMessage){
        try {
            const response = await axios.post("http://localhost:3000/api/v1/chat/save-room-messages" , userMessage , {
                withCredentials: true
            })
            console.log("saveRoomResponse" , response)
    
            return response
        } catch (error) {
            return error.data
        }
    }
}
   


const chat = new chatApi()

export{
    chat
}
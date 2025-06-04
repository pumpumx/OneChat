import axios from "axios";

class chatApi{
    constructor(data){
        this.data = data;
    }

    async loadRoomMessage(){
        try {
            const response = await axios.get(`${import.meta.env.BACKEND_URL}api/v1/chat/load-room-messages`,{
                withCredentials:true
            })
            console.log("loadMessageResponse" , response)

            return response;
        } catch (error) {
            console.log("error")
            return error.data.message.message
        }
    }

    async  saveRoomMessage(userMessage){
        try {
            const response = await axios.post(`${import.meta.env.BACKEND_URL}/api/v1/chat/save-room-messages` , userMessage , {
                withCredentials: true
            })
            console.log("saveRoomResponse" , response)
    
            return response
        } catch (error) {
            return error.data
        }
    }
    async fetchPersonalMessage(friendName){
        try {
            const response = await axios.post(`${import.meta.env.BACKEND_URL}api/v1/chat/fetch-personal-chat` , {friendName}, {
                withCredentials:true
            })
            return response.data.message.personalMessages.messages
        } catch (error) {
            console.log("Error while fetching" , error)
        }
    }

    async savePersonalMessage(friendName , messageFromSender){
        try { //Add some redis type shit , didn't learned it yet!! 
            const response = await axios.post(`${import.meta.env.BACKEND_URL}api/v1/chat/save-personal-chat` , {friendName , messageFromSender},{
                withCredentials:true
            })
            return response.data;
        } catch (error) {
            console.log("Error at savePersonal Message" , error)            
        }
    }

}

   


const chat = new chatApi()

export{
    chat
}
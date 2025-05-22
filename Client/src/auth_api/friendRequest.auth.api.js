import axios from 'axios'

class friend{
    constructor(data){
        this.data = data
    }

    async sendFriendRequest(data){
        const response = await axios.post("http://localhost:3000/api/v1/friend/send-request",data)
        return response.data;
    }

    async checkPendingFriendRequest(){
        
    }
}

const friendReq = new friend()

export {
    friendReq
}
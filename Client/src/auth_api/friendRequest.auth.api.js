import axios from 'axios'

class friend{
    constructor(data){
        this.data = data
    }

    async sendFriendRequest(data){
        const response = await axios.post("http://localhost:3000/api/v1/friend/send-request",data,{
            withCredentials:true
        })
        return response.data;
    }

    async checkPendingFriendRequest(){
        const response = await axios.get("http://localhost:3000/api/v1/friend/fetch-pending-request",{
            withCredentials:true
        })
        const jsonRes = response.data.message.allPendingRequest
        return jsonRes;
    }
}

const friendReq = new friend()

export {
    friendReq
}
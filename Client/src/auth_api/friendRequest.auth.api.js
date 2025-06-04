import axios from 'axios'

class friend{
    constructor(data){
        this.data = data
    }

    async sendFriendRequest(friendUsername){
        const response = await axios.post(`${import.meta.env.BACKEND_URL}/api/v1/friend/send-request`,{friendUsername:friendUsername},{
            withCredentials:true
        })
        return response.data;
    }

    async checkPendingFriendRequest(){
        const response = await axios.get(`${import.meta.env.BACKEND_URL}/api/v1/friend/fetch-pending-request`,{
            withCredentials:true
        })
        const jsonRes = response.data.message.allPendingRequest
        return jsonRes;
    }

    async fetchAcceptedFriends(){
        const response = await axios.get(`${import.meta.env.BACKEND_URL}/api/v1/friend/fetch-friend-list` ,{
            withCredentials: true   
        })

        const jsonRes = response.data.message.friendList
        return jsonRes;
    }

    async friendReqAction(responseFromUser , usernameOfUserWhoSentFriendRequest){
        const response = await axios.post(`${import.meta.env.BACKEND_URL}/api/v1/friend/friend-request-action` , {responseFromUser , usernameOfUserWhoSentFriendRequest} , {
            withCredentials:true
        })
        const jsonRes  =  response.data
        return jsonRes
    }
    
    async removeFriend(friendUsername){
        const response = await axios.delete(`${import.meta.env.BACKEND_URL}/api/v1/friend/remove-friend` , {
            data:{friendUsername:friendUsername},
            withCredentials:true,

        })
        return response

    }
    
}

const friendReq = new friend()

export {
    friendReq
}
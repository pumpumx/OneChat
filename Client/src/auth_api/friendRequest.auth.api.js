import axios from 'axios'

class friend{
    constructor(data){
        this.data = data
    }

    async sendFriendRequest(friendUsername){
        const response = await axios.post("http://localhost:3000/api/v1/friend/send-request",{friendUsername:friendUsername},{
            withCredentials:true
        })
        return response.data;
    }

    async checkPendingFriendRequest(){
        console.log("Inside function")
        const response = await axios.get("http://localhost:3000/api/v1/friend/fetch-pending-request",{
            withCredentials:true
        })
        const jsonRes = response.data.message.allPendingRequest
        console.log("json res" , jsonRes)
        return jsonRes;
    }

    async fetchAcceptedFriends(){
        const response = await axios.get("http://localhost:3000/api/v1/friend/fetch-friend-list" ,{
            withCredentials: true   
        })
        const jsonRes = response.data.message
        console.log("json Res" , jsonRes)
        return jsonRes;
    }

    async friendReqAction(responseFromUser , usernameOfUserWhoSentFriendRequest){
        const response = await axios.post("http://localhost:3000/api/v1/friend/friend-request-action" , {responseFromUser , usernameOfUserWhoSentFriendRequest} , {
            withCredentials:true
        })
        const jsonRes  =  response.data.message
        console.log("jsonRes",response.data)
        return jsonRes
    } 
}

const friendReq = new friend()

export {
    friendReq
}
import axios from 'axios'

class friend{
    constructor(data){
        this.data = data
    }

    async sendFriendRequest(friendUsername){
        const response = await axios.post("/api/v1/friend/send-request",{friendUsername:friendUsername},{
            withCredentials:true
        })
        return response.data;
    }

    async checkPendingFriendRequest(){
        console.log("Inside function")
        const response = await axios.get("/api/v1/friend/fetch-pending-request",{
            withCredentials:true
        })
        const jsonRes = response.data.message.allPendingRequest
        return jsonRes;
    }

    async fetchAcceptedFriends(){
        const response = await axios.get("/api/v1/friend/fetch-friend-list" ,{
            withCredentials: true   
        })

        const jsonRes = response.data.message.friendList
        return jsonRes;
    }

    async friendReqAction(responseFromUser , usernameOfUserWhoSentFriendRequest){
        const response = await axios.post("/api/v1/friend/friend-request-action" , {responseFromUser , usernameOfUserWhoSentFriendRequest} , {
            withCredentials:true
        })
        console.log("Lets goooo")
        const jsonRes  =  response.data
        console.log("jsonRes",response.data)
        return jsonRes
    }
    
    async removeFriend(friendUsername){
        const response = await axios.delete("/api/v1/friend/remove-friend" , {
            data:{friendUsername:friendUsername},
            withCredentials:true,

        })
        console.log("remove res" , response)
        return response

    }
    
}

const friendReq = new friend()

export {
    friendReq
}
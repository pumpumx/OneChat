import axios from 'axios'
class authentication{
    constructor(formData){
        this.formData = formData;
    }
    async registerUser(formData){
        try {
            const response = await axios.post("http://localhost:3000/api/v1/users/register" , formData , {
                withCredentials: true
            })
            console.log("Register response: " , response )

            return response;


        } catch (error) {
            console.log("Error while registering user" , error.error)
        }
    }

    async loginUser(formData){
        try {
            const response = await axios.post("http://localhost:3000/api/v1/users/login" , formData )
            return response;
        } catch (error) {
            console.log("Error while Login User user" , error)
        }
    }

    async socketAuth(){
        const socketTokenResponse = await axios.post("http://localhost:3000/api/v1/chat/socket-auth" , null, {
            withCredentials: true
        })
        console.log("socket Token " , socketTokenResponse.data.message.socketToken)
        return socketTokenResponse.data.message.socketToken;

    }
}


const authMethod = new authentication;

export{
    authMethod,
}
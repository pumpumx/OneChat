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
            const response = await axios.post("http://localhost:3000/api/v1/users/login" , formData ,{
                withCredentials: true
            } )
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

    async isAuthenticated(){
       const isAuth =  await axios.post("http://localhost:3000/api/v1/users/user-auth" , null , {
        withCredentials: true
       })
       console.log("user at auth" , isAuth.data.status )

       if(isAuth.data.status == 200 ){
        return true
       } 
       return false
    }

    async logout(){
       const response =  await axios.post("http://localhost:3000/api/v1/users/logout" , null , {
            withCredentials: true
        })
        return response;
    }
}


const authMethod = new authentication;

export{
    authMethod,
}
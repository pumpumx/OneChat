import axios from 'axios'
class authentication{
    constructor(formData){
        this.formData = formData;
    }
    async registerUser(formData){
        try {
            const response = await axios.post("http://localhost:3000/api/v1/users/register" , formData)
            console.log("Register response: " , response )
            return response;
        } catch (error) {
            console.log("Error while registering user" , error.error)
        }
    }

    async loginUser(formData){
        try {
            const response = await axios.post("http://localhost:3000/api/v1/users/login" , formData)
            const data = response.json()
            return data;
        } catch (error) {
            console.log("Error while Login User user" , error)
        }
    }
}


const authMethod = new authentication;

export{
    authMethod,
}
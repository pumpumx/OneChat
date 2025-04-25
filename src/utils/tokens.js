import { User } from "../models/user.model.js"
import { ApiError } from "./apiError.js"
const generateTokens = async (userid)=>{
    try {
        console.log("id at token" , userid)
        const user = await User.findById(userid)
        console.log(user)
        if(!user) throw new ApiError(400, "User does Not exist")
        const accessToken = user.generateAccessToken()
        console.log("accessToken" , accessToken)
        if(!accessToken) throw new ApiError(500 , "Failed to generate accessToken")

        const refreshToken = user.generateRefreshToken()
        if(!refreshToken) throw new ApiError(500 , "Failed to generate Refresh Token")
        
            const tokens = {accessToken , refreshToken}
        return tokens
    } catch (error) {
        throw new ApiError(500 , "Tokens error occured" , error)
    }
}

export default generateTokens
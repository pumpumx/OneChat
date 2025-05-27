import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
const verifyJWT = asyncHandler(async (req , _ , next)=>{

    const accessToken = req.cookies?.accessToken 

    if(!accessToken) throw new ApiError(400 , "Invalid Access Token")

    const decodedAccessToken = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedAccessToken._id).select("-password -refreshToken ")

    if(!user) throw new ApiError(400 , "Error finding user while Getting access Token")

    req.user = user
    next()  

})


export default verifyJWT
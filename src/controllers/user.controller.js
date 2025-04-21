import { User } from '../models/user.model.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import uploadToCloudinary from '../utils/Cloudinary.js'
import generateTokens from '../utils/tokens.js'
const register = asyncHandler(async(req , res)=>{
    //register a user
    const {username , password , fullName , email} = req.body

    if([username,password,fullName,email].some((val)=>val?.trim() === "")){
        throw new ApiError(400 , `${val} is not present`)
    }

    const userValidation = User.findOne({
        $or: [{email},{username}]
    })

    if(userValidation) throw new ApiError(409 , "User already exists")

    console.log("avatar : " ,req.files.avatar[0]?.path)
    const avatarLocalPath = req.files.avatar[0]?.path
    if(!avatarLocalPath) throw new ApiError(400 , "Avatar not Present")

    const avatarUri = await uploadToCloudinary(avatarLocalPath) //Uploads file to cloudinary 

    const newUser = await User.create({
        fullName : fullName,
        username : username.toLowerCase(),
        password : password ,
        email : email ,
        avatar : avatarUri.url,
        refreshToken: ""
    })

    const user = User.findById(user._id).select("username , fullName , email , avatar")
    
    await newUser.save()
    console.log("newUser" , newUser)

    return res
    .status(200)
    .json(
        new ApiResponse(200 , "User registered Successfully", {user})
    )
})

export {
    register
}
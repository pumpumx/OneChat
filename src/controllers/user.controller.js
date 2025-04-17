import { User } from '../models/user.model.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import uploadToCloudinary from '../utils/Cloudinary.js'
const register = asyncHandler(async(req , res)=>{
    //register a user
    const {username , password , fullName , email} = req.body

    if([username,password,fullName,email].reduce((val)=>val?.trim() === "")){
        throw new ApiError(400 , `${val} is not present`)
    }

    const avatarLocalPath = req.files.avatar[0]?.path
    if(!avatarLocalPath) throw new ApiError(400 , "Avatar not Present")

    const avatarUri = await uploadToCloudinary(avatarLocalPath)
    
    console.log(avatarUri)

    const newUser = new User({
        fullName : fullName,
        username : username,
        password : password ,
        email : email ,
        avatar : avatarUri.url
    })

    await User.save(newUser) 

    return res
    .status(200)
    .json(
        new ApiResponse(200 , "User registered Successfully")
    )
})

export {
    register
}
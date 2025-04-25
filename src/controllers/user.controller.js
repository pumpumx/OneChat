import { User } from '../models/user.model.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import uploadToCloudinary from '../utils/Cloudinary.js'
import generateTokens from '../utils/tokens.js'
const register = asyncHandler(async(req , res)=>{
    //register a user
    const {username , password , fullName , email} = req.body

    if([username,password,fullName,email].some((val)=>!val?.trim())){
        throw new ApiError(400 , `All fieldValues are required`)
    }

    const userValidation = await User.findOne({
        $or: [{email},{username}]
    })

    if(userValidation) throw new ApiError(409 , "User already exists")
    // if(req.files?.avatar[0].path){
    // console.log("file" , req.files)
    // console.log("avatar : " , req.files.avatar[0]?.path , req.files)
    // const avatarLocalPath = req.files.avatar[0]?.path
    // if(!avatarLocalPath) throw new ApiError(400 , "Avatar not Present")

    // const avatarUri = await uploadToCloudinary(avatarLocalPath) //Uploads file to cloudinary 
    // }
        
        const newUser = await User.create({
            fullName : fullName,
            username : username.toLowerCase(),
            password : password ,
            email : email ,
            // avatar : avatarUri?.url || "",
            refreshToken: ""
        })
        await newUser.save()


        const user = await User.findOne({
            $or :[{email} , {username}]
        }).select("username , fullName , email , avatar")
        console.log("User" , user)
        if(!user) throw new ApiError(400 , "response User not found")
        
        return res
        .status(200)
        .json(
            new ApiResponse(200 , "User registered Successfully", {user})
        )
})

const loginUser = asyncHandler(async(req ,res)=>{

    console.log("req" , req.body)
    const {username , password , email} = req.body;

    console.log("username ,email, pass" , username  ,email , password)
    if(!username && !email) throw new ApiError(400,"Enter username or email")
        
    const user  = await User.findOne({
        $or: [{email} , {username}]
    })
    console.log("user" , user)

    if(!user) throw new ApiError(400 , "User does not exist")

    const passwordValidation = await user.isPasswordCorrect(password)
    console.log("user",passwordValidation)

    if(!passwordValidation) throw new ApiError(401 , "Password incorrect")

    const tokens = await generateTokens(user._id)
    if(!tokens.accessToken || !tokens.refreshToken) throw new ApiError(500 , "Tokens does not exist")
    const accessToken = tokens.accessToken
    const refreshToken = tokens.refreshToken
    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(200 , "User logged in Successfully" , {})
    )
})

const deleteUser = asyncHandler(async(req , res)=>{
    const user = req.user
    if(!user) throw new ApiError(400 , "User Invalid")

    await User.findByIdAndDelete(user._id)

    return res
    .status(200)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json(
        new ApiResponse(200 , "User Deleted Successfully")
    )

})
export {
    register,
    loginUser,
    deleteUser
}
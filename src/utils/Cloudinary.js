import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'

cloudinary.config({
    cloud_name : "dtvpqxbsd",
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    secure: false
})
const uploadToCloudinary = async (localImagePath)=> { //Path of the local image will be provided by multer middleware
    try {
        console.log("image path:: ",localImagePath)
        const fileUploadToCloudinary = await cloudinary.uploader.upload(localImagePath) 

        if(!fileUploadToCloudinary) throw new ApiError(500 , "Error Uploading file to cloudinary")
        fs.unlinkSync(localImagePath)
        return fileUploadToCloudinary
    } 
    catch (error) {
        fs.unlinkSync(localImagePath)
        throw new ApiError(500 , "Error uploading file to cloudinary")
    }
} 
export default uploadToCloudinary
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'

cloudinary.config({
    cloud_name : "dtvpqxbsd",
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,


})
const uploadToCloudinary = async (localImagePath)=> { //Path of the local image will be provided by multer middleware
    try {
        const fileUploadToCloudinary = await cloudinary.v2.uploader.upload(localImagePath)
        if(!fileUploadToCloudinary) throw new ApiError(500 , "Error Uploading file to cloudinary")
        fs.unlinkSync(localImagePath)
        return res
        .status(200)
        .json(
            new ApiResponse(200, {fileUploadToCloudinary} ,"avatar Successfully Uploaded to cloudinary")
        )
        
    } catch (error) {
        fs.unlinkSync(localImagePath)
        throw new ApiError(500 , "Error uploading file to cloudinary")
    }
}

export default uploadToCloudinary
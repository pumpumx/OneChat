import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken'
const sendMessage = {
    
}

const socketAuth = asyncHandler(async(req , res) => {
    const user = req.user;
    const socketToken = jwt.sign({
        _id : user.id,
        username : user.username,
        email : user.email,
    },
    process.env.SOCKET_AUTH_SECRET,
    {expiresIn: "10m"}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200 , 'Socket verified' , {socketToken})
    )
})
export {
    socketAuth
}
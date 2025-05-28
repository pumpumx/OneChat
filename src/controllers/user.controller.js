import { User } from '../models/user.model.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import generateTokens from '../utils/tokens.js'
const register = asyncHandler(async (req, res) => {
    //register a user
    const { username, password, firstName, lastName, email } = req.body

    if ([username, password, firstName, lastName, email].some((val) => !val?.trim())) {
        throw new ApiError(400, `All fieldValues are required`)
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password min length should be 6")
    }

    const userValidation = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userValidation) {
        throw new ApiError(409, "User already exists")
    }

    // if(req.files?.avatar[0].path){
    // console.log("file" , req.files)
    // console.log("avatar : " , req.files.avatar[0]?.path , req.files)
    // const avatarLocalPath = req.files.avatar[0]?.path
    // if(!avatarLocalPath) throw new ApiError(400 , "Avatar not Present")

    // const avatarUri = await uploadToCloudinary(avatarLocalPath) //Uploads file to cloudinary 
    // }
    const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email,
        // avatar : avatarUri?.url || "",
        refreshToken: ""
    })
    await newUser.save()


    const user = await User.findOne({
        $or: [{ email }, { username }]
    }).select("_id username firstName lastName  email ")

    if (!user) throw new ApiError(400, "User not found")

    const { accessToken, refreshToken } = await generateTokens(user._id)

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
    await User.findByIdAndUpdate(user._id,
        { refreshToken },
        { new: true }
    ).select("_id")

    return res
        .status(200)
        .cookie("accessToken",accessToken)
        .json(
            new ApiResponse(200, "User registered Successfully", { user })
        )
})

const loginUser = asyncHandler(async (req, res) => {

    console.log("req", req.body)
    const { username, password, email } = req.body;


    if (!username && !email) throw new ApiError(400, "Enter username or email")

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    console.log("user", user)

    if (!user) throw new ApiError(400, "User does not exist")

    const passwordValidation = await user.isPasswordCorrect(password)

    if (!passwordValidation) throw new ApiError(401, "Password incorrect")

    const tokens = await generateTokens(user._id)
    if (!tokens.accessToken || !tokens.refreshToken) throw new ApiError(500, "Tokens does not exist")
    const accessToken = tokens.accessToken
    const refreshToken = tokens.refreshToken
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    const resUser = await User.findByIdAndUpdate(user._id,
        { refreshToken },
        { new: true }
    ).select("_id")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, "User logged in Successfully", { resUser })
        )
})


const updateUserDetails = asyncHandler(async (req, res) => { //This api is full of flaws no additional validation of checking values in db , fix it.
    const { username, email, fullName } = req.body

    if (![username, email, fullName].some((val) => val?.trim() !== "")) {
        throw new ApiError(400, "Atleast one field is required")
    }
    const user = req.user?._id
    if (!user) throw new ApiError(400, "Invalid User")

    const updatedUser = await User.findById(user)

    if (username?.trim()) updatedUser.username = username
    if (fullName?.trim()) updatedUser.fullName = fullName
    if (email?.trim()) updatedUser.email = email

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User Details Changed SuccessFully")
        )
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body


    if ([oldPassword, newPassword, confirmPassword].some((val) => !val?.trim())) {
        throw new ApiError(400, "All fields are required")
    }

    const user = req.user._id

    if (!user) throw new ApiError(400, "User Unauthenticated", [{ message: "User is unauthenticated" }]) //Additional step to check

    const updatePassOfUser = await User.findById(user)
    if (!updatePassOfUser) throw new ApiError(400, "Invalid User")

    const passwordValidation = updatePassOfUser.isPasswordCorrect(oldPassword)
    if (!passwordValidation) throw new ApiError(400, "Invalid old Password")

    if (newPassword.length < 6) throw new ApiError(400, "min Password length must be 6")

    if (newPassword !== confirmPassword) throw new ApiError(400, "password Does Not match ")

    updatePassOfUser.password = newPassword

    await updatePassOfUser.save({ validateModifiedOnly: true })
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Password Changed Successfully")
        )
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) throw new ApiError(400, "User Invalid")

    await User.findByIdAndDelete(user._id)

    return res
        .status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(
            new ApiResponse(200, "User Deleted Successfully")
        )

})

const isUserAuthenticated = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) throw new ApiError(404, "User Unauthenticated")

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User Authenticated", { user })
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) throw new ApiError(404, "Invalid User")

    return res
        .status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json(
            new ApiResponse(200, "User Logout Successfully", { status: true })
        )
})

export {
    register,
    loginUser,
    deleteUser,
    isUserAuthenticated,
    changePassword,
    updateUserDetails,
    logoutUser
}
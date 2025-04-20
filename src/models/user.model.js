import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type:String,
            required : true,
        },
        username : {
            type : String, 
            required : true,
            unique:true,
        },
        email : {
            type : String,
            required : true ,
            unique: true
        },
        password : {
            type: String,
            required : true,
        },
        avatar : {
            type: String,
        },
        refreshToken : {
            type : String,
            required : true
        },
        accessToken: {
            type : String,
            required : true,
        }
    },{timestamps:true})

export const User = mongoose.model("User", userSchema)


userSchema.pre('save', (password)=>{
    this.password = bcrypt.hashSync(password , 10)
})

userSchema.methods.isPasswordCorrect = (password)=>{
   return bcrypt.compareSync(password , this.password)
}

userSchema.methods.generateAccessToken = ()=>{
    jwt.sign(
        {
            _id : this._id,
            username: this.username,
            password: this.password,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = ()=>{
    jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    )
}



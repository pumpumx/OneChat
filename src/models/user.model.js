import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type:String,
            required : true,
        },
        lastName:{
            type:String,
            required:true
        },
        username : {
            type : String, 
            required : true,
            unique:true,
            lowercase:true,
        },
        email : {
            type : String,
            required : true ,
            unique: true,
        },
        password : {
            type: String,
            required : true,
        },
        avatar : {
            type: String,
            // required: true,
        },
        refreshToken : {
            type : String || null,
        },
    },{timestamps:true})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
   try {
     const accessToken = jwt.sign(
         {
             _id : this._id,
             username: this.username,
             password: this.password,
             email: this.email
         },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
     )
     return accessToken
   } catch (error) {
        console.log(500, "error at generateAccessToken")
        return null
   }
}

userSchema.methods.generateRefreshToken = function(){
  try {
      const refreshToken = jwt.sign(
          {
              _id:this._id
          },
          process.env.REFRESH_TOKEN_SECRET,
          {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
      )
      return refreshToken
  } catch (error) {
    console.log("error at generateRefreshToken")
    return null

  }
}

export const User = mongoose.model("User", userSchema)




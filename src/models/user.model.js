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
            required: true,
        },
        refreshToken : {
            type : String,
        }
    },{timestamps:true})

userSchema.pre('save', (password , next)=>{
    this.password = bcrypt.hashSync(password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = function(password){
   return bcrypt.compareSync(password , this.password)
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




import mongoose, { mongo } from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true
        },
        friendId:{
            type:mongoose.Types.ObjectId,
            ref:"User",
        },
        chatHistory:{
            type:mongoose.Types.ObjectId,
            ref:"Chat"
        }
    },{timestamps:true}
)

export const Friend = mongoose.model('Friend',friendSchema)
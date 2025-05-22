import mongoose from "mongoose";

const friendChatSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        sender:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        content:{
            type:String,
        },
        timestamps:{
            type:Date,
            default:Date.now
        }
    }]
},{timestamps:true})

friendChatSchema.index({participants:1})

export const FriendChat = mongoose.model("FriendChat",friendChatSchema)
import mongoose from "mongoose";

const friendChatSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }],
    messages:[{
        sender:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        content:{
            type:String,    
        },
        senderTimestamp:{
            type:Date,
            default:Date.now
        }
    }]
},{timestamps:true})

friendChatSchema.index({participants:1})
friendChatSchema.path('participants').validate(function(arr){
    return arr.length === 2;
})

export const FriendChat = mongoose.model("FriendChat",friendChatSchema)
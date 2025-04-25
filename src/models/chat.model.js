import mongoose from "mongoose";
import { User } from "./user.model";

const chatSchema = new mongoose.Schema(
    {
        chatHistory:[{
            sender: {
                type:mongoose.Types.ObjectId,
                ref:User,
                required: true,
            },
            reciever: {
                type:mongoose.Types.ObjectId,
                ref:User,
                required:true,
            },
            timestamps : {
                type:Date,
                default:Date.now,
            }
        }]
    },{timestamps:true})

export const Chat = mongoose.model("Chat" , chatSchema)
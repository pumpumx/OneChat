import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: false,

        },
        roomMessages: {
            type: [String],
            required: false
        }
    },{ timestamps: true })

export const Chat = mongoose.model("Chat", chatSchema)
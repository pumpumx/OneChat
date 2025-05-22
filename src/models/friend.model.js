import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        friendId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ['Accepted', 'Rejected', 'Pending'],
            default: 'Pending'
        },
        chatHistory: {
            type: mongoose.Types.ObjectId,
            ref: "Chat"
        }
    }, { timestamps: true }
)

export const Friend = mongoose.model('Friend', friendSchema)
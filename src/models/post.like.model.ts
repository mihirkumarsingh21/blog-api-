import mongoose from "mongoose";

export interface PostLikeType {
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
    like?: number
}

const postLikeSchema = new mongoose.Schema < PostLikeType >({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },

    like: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true});


export const Like = mongoose.model < PostLikeType > ("Like", postLikeSchema);
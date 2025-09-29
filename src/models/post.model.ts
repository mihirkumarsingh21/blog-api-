
import mongoose from "mongoose";

export interface PostInterface {
    writer: mongoose.Types.ObjectId,
    title: string,
    description: string,
    like?: number,
    image?: string
}

const postSchema = new mongoose.Schema < PostInterface > ({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    like: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: ""
    }
}, {timestamps: true});


export const Post = mongoose.model < PostInterface > ("Post", postSchema);
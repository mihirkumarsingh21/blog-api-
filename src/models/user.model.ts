import mongoose, { Document, Model, Schema } from "mongoose";

interface UserInterface extends Document {
    name: string,
    email: string,
    passworHash: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema : Schema < UserInterface > = new Schema ({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true 
    },

    passwordHash: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

export const User: Model < UserInterface > = mongoose.model("User", userSchema);

import mongoose from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  
}

const userSchema = new mongoose.Schema < UserInterface > (
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model < UserInterface > ("User", userSchema);

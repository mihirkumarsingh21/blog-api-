import mongoose from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  bookMarkedPost: mongoose.Types.ObjectId;
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

    role: {
      type: String,
      default: "user",
      enum: ["user", "author"]
    },

      bookMarkedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: []
    }
  },
  { timestamps: true }
);

export const User = mongoose.model < UserInterface > ("User", userSchema);

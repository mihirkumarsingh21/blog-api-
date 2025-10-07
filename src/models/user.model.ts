import mongoose from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  bio: string;
  profilePic: string;
  followers?: mongoose.Types.ObjectId;
  following?: mongoose.Types.ObjectId;
  bookMarkedPost: mongoose.Types.ObjectId;
  followersC: number;
  followingC: number;
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

    bio: {
      type: String,
      maxlength: 30,
    },

    profilePic: {
      type: String
    },

    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }],

    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }],

    followersC: {
      type: Number,
      default: 0
    },

    followingC: {
      type: Number,
      default: 0
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "author"]
    },

      bookMarkedPost: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model < UserInterface > ("User", userSchema);

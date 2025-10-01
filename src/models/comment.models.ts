import mongoose from "mongoose";

export interface CommentType {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  comment?: string;
}

export const commentSchema = new mongoose.Schema<CommentType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model<CommentType>("Comment", commentSchema);

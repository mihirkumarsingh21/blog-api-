import mongoose, { PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";


export interface PostInterface {
  writer: mongoose.Types.ObjectId;
  title: string;
  description: string;
  like?: mongoose.Types.ObjectId;
  image?: string;
  isDeleted?: boolean;
  views?: number;
  viewBy?: mongoose.Types.ObjectId;
  tags: string[];
  category: string;
  status: string;
  bookMarkedPost: string[]
}

const postSchema = new mongoose.Schema<PostInterface>(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    viewBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    tags: {
      type: [String],
      default: []
    },

    category: {
      type: String,
      default: "general"
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
  },
  { timestamps: true }
);

postSchema.plugin(paginate);
postSchema.index({ title: "text", description: "text" });

export const Post = mongoose.model<PostInterface, PaginateModel<PostInterface>>(
  "Post",
  postSchema
);

import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  gettingPost,
  postsInPagination,
  updatePost,
  gettingPostBySearching,
  getSinglePost,
} from "../controllers/post.controller.js";
import { author } from "../middlewares/author.middleware.js";

const route = express.Router();

route.post("/create", authProtect, createPost);
route.get("/get-post", authProtect, gettingPost);
route.get("/get-post/:page/:limit", authProtect, postsInPagination);
route.put("/update-post/:postId", authProtect, author, updatePost);
route.delete("/delete/:postId", authProtect, author, deletePost);

route.get("/search-post", authProtect, gettingPostBySearching);

route.get("/single-post/:postId", authProtect, getSinglePost);

export default route;

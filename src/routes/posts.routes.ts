import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { createPost, deletePost, gettingPost, postsInPagination, updatePost } from "../controllers/post.controller.js";

const route = express.Router();

route.post("/create", authProtect, createPost);
route.get("/get-post", authProtect, gettingPost);
route.get("/get-post/:page/:limit", authProtect, postsInPagination);
route.put("/update-post/:postId", authProtect, updatePost);
route.delete("/delete/:postId", authProtect, deletePost);



export default route;

import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { createPost, gettingPost, postsInPagination } from "../controllers/post.controller.js";


const route = express();

route.post("/create", authProtect, createPost);
route.get("/get-post", authProtect, gettingPost);
route.get("/get-post/:page/:limit", authProtect, postsInPagination);
export default route;

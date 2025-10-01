import express from "express";
import { postLike } from "../controllers/post.like.controller.js";
import { authProtect } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("/like-post/:postId", authProtect, postLike);





export default route;
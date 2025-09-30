import express from "express";
import { postLike } from "../controllers/post.like.controller.js";

const route = express.Router();

route.post("/like-post/:postId", postLike);





export default route;
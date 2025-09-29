import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";


const route = express();

route.post("/create", authProtect, createPost);


export default route;

import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, updateComment } from "../controllers/comment.controller.js";

const route = express.Router();

route.post("/add-comment/:postId", authProtect, addComment);
route.put("/post-update/:postId", authProtect, updateComment);
route.delete("/delete-comment/:commentId/post/:postId", authProtect, deleteComment);




export default route;
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
  addingCategoryToPost,
  gettingPostByCategory,
  addingTagToThePost,
  gettingPostByTag,
  gettingDraftPosts,
  gettingPublishedPost,
  addingPostInBookMark
} from "../controllers/post.controller.js";
import { author } from "../middlewares/author.middleware.js";

const route = express.Router();

route.post("/create", authProtect, createPost);
route.get("/get-post", authProtect, gettingPost);
route.get("/get-post/:page/:limit", authProtect, postsInPagination);
route.put("/update-post/:postId", authProtect, author, updatePost);
route.delete("/delete/:postId", authProtect, author, deletePost);

route.get("/search-post", authProtect, gettingPostBySearching);

route.patch("/single-post/:postId", authProtect, getSinglePost);

route.put("/add-cateory/:postId", authProtect, addingCategoryToPost);
route.get("/posts-by-category/:categoryName", authProtect, gettingPostByCategory);
route.put("/add-tag/:postId", authProtect, addingTagToThePost);
route.get("/post-by-tag/:tagName", authProtect, gettingPostByTag);

route.get("/get-draft-posts", authProtect, gettingDraftPosts);

route.get("/get-published-post", gettingPublishedPost);

route.post("/bookmark/:postId", authProtect, addingPostInBookMark);



export default route;

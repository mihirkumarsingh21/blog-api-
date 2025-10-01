import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import { Like } from "../models/post.like.model.js";

export const postLike = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params as {
      postId: string;
    };

    const { userId, like } = req.body as {
      userId: string;
      like: string;
    };

    if (!isValidObjectId(postId)) {
      res.status(400).json({
        success: false,
        message: "Invalid post id.",
      });
      return;
    }

    if (!userId || !like) {
      res.status(400).json({
        success: false,
        message: "these feilds are required.",
      });
      return;
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "post not found no post present with this id.",
      });
      return;
    }

    const isUserAlreadyLikePost = await Like.findOne({ userId });

    if (isUserAlreadyLikePost) {
        
        res.status(200).json({
            success: true,
            message: "post already liked."
        })
    
        return;
    }

    const postLike = await Like.create({
        userId,
        postId,
        like,
      });      

       if (!postLike) {
        res.status(400).json({
          success: false,
          message: "Unable to like the post.",
        });
        return;
      }

     await Post.findByIdAndUpdate(postId, { $set: { postLikeId: postLike._id}}, {new: true});
      
      res.status(200).json({
        success: true,
        message: "post liked successfully.",
        postLike: postLike

      });


  } catch (error) {
    console.log(`error while user liking post :${error}`);

    res.status(500).json({
      success: false,
      message: `server error something went wrong: ${error}`,
    });
  }
};



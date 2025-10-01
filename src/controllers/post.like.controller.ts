import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import { Like } from "../models/post.like.model.js";
import { User } from "../models/user.model.js";

export const postLike = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params as {
      postId: string;
    };

    const { like } = req.body as {
      like: string;
    };

    if (!isValidObjectId(postId)) {
      res.status(400).json({
        success: false,
        message: "Invalid post id.",
      });
      return;
    }

    const userId = req.userId;
    if(!userId) {
      res.status(403).json({
          success: false,
          message: "unauthorized user found."
      })
      return;
    }

    if (!like) {
      res.status(400).json({
        success: false,
        message: "like field are required.",
      });
      return;
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "post not found : no post present with this id.",
      });
      return;
    }

    const user = await User.findById(userId);
    if(user?.role !== "user") {
        res.status(400).json({
          success: false,
          message: "only auth user can like this post."
        })
        return;
    }
    const isUserAlreadyLikePost = await Like.findOne({userId: user?._id, postId: post?._id});
    
    if (isUserAlreadyLikePost) {
     await Like.findOneAndDelete({userId: isUserAlreadyLikePost?.userId, postId: isUserAlreadyLikePost?.postId});

     res.status(200).json({
      success: true,
      message: "post unlike successfully."
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

     await Post.findByIdAndUpdate(postId, { $set: { like: postLike._id}}, {new: true});
      
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
    return;
  }
};



import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.models.js";
import { Post } from "../models/post.model.js";

export const addComment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const { comment } = req.body as {
      comment: string;
    };

    if (!comment) {
      res.status(400).json({
        success: false,
        message: "your comment field are empty.",
      });
      return;
    }

    if (!postId) {
      res.status(400).json({
        success: false,
        message: "post id is not present in your url.",
      });
      return;
    }

    if (!isValidObjectId(postId)) {
      res.status(400).json({
        success: false,
        message: "Invalid post id.",
      });
      return;
    }

    const isValidPost = await Post.findById(postId);
    if (!isValidPost) {
      res.status(404).json({
        success: false,
        message: "Post are not present with this id.",
      });
    }

    const authUser = await User.findById(req.userId);
    if (!authUser) {
      res.status(403).json({
        success: false,
        message: "Unauthorized user found.",
      });
    }

    const commentAdded = await Comment.create({
      userId: authUser?._id,
      postId: isValidPost?._id,
      comment,
    });

    if (!commentAdded) {
      res.status(400).json({
        success: false,
        message: "Failed to add your comment please try after some time.",
      });
    }

    res.status(201).json({
      success: true,
      message: "your comment added successfully",
      yourComment: commentAdded.comment,
    });
  } catch (error) {
    console.log(`server error something went wrong: ${error}`);

    res.status(500).json({
      success: false,
      message: `server error something went wrong: ${error}`,
    });
    return;
  }
};

export const updateComment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const { comment } = req.body as {
      comment: string;
    };

    if (!comment) {
      res.status(400).json({
        success: false,
        message: "your comment field are empty.",
      });
      return;
    }

    if (!postId) {
      res.status(400).json({
        success: false,
        message: "post id are not present in your url.",
      });
      return;
    }

    if (!isValidObjectId(postId)) {
      res.status(400).json({
        success: false,
        message: "Invalid post id.",
      });
      return;
    }

    const commentedUser = await Comment.findOne({ userId: req.userId, postId });
    console.log(`commented user: ${commentedUser}`);

    if (!commentedUser) {
      res.status(404).json({
        success: false,
        message: "no any post commented with this user.",
      });
      return;
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentedUser._id,
      { comment },
      { new: true }
    );
    if (!updatedComment) {
      res.status(400).json({
        success: false,
        message: "failed to update your commnet.",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "your comment updated successfully.",
      yourUpdatedComment: updatedComment.comment,
    });
  } catch (error) {
    console.log(`error while updating comment: ${error}`);

    res.status(500).json({
      success: false,
      message: `server error something went wrong : ${error}`,
    });

    return;
  }
};

export const deleteComment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
    try {
        const { commentId, postId } = req.params;
        if(!commentId && !postId) {
            res.status(400).json({
                success: false,
                message: "comment id and post id are not present in your url."
            })
            return;
        }

        if(!isValidObjectId(commentId) && !isValidObjectId(postId)) {
            res.status(400).json({
                success: false,
                message: "Invalid commnet and post id."
            })
            return;
        }

        const deletedComment = await Comment.findOneAndDelete({
            _id: commentId,
            userId: req.userId,
            postId: postId
        });

        if(!deletedComment) {
            res.status(400).json({
                success: false,
                message: "failed to delete your commnet Or your comment already deleted."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "your comment deleted successfully."
        })

    } catch (error) {
        console.log(`error while deleting comment :${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        return;
    }
};

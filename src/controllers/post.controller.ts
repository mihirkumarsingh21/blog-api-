import type { Response } from "express";
import { Post, PostInterface } from "../models/post.model.js";
import mongoose, { HydratedDocument, isValidObjectId } from "mongoose";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export const createPost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body as {
      title: string;
      description: string;
      viewBy?: mongoose.Types.ObjectId
    };

    if (!title || !description) {
      res.status(400).json({
        success: false,
        message: "Title and Description fields are required.",
      });
      return;
    }

    type PostDocumentType = HydratedDocument<PostInterface>;

    const createdPost: PostDocumentType = await Post.create({
      writer: req.userId,
      title,
      description,
      like: req.userId,
      viewBy: req.userId
    });

    if (!createdPost) {
      res.status(400).json({
        success: false,
        message: "Failed to create post.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      posts: createdPost,
    });
  } catch (error) {
    console.log(`error while creating post: ${error}`);

    res.status(500).json({
      success: false,
      message: `server error something went wrong: ${error}`,
    });

    return;
  }
};

export const gettingPost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const posts = await Post.find({ writer: req.userId }).populate(
      "writer",
      "name"
    );

    if (!posts || posts.length <= 0) {
      res.status(404).json({
        success: false,
        message: "post not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.log(`error while getting all posts: ${error}`);

    res.status(500).json({
      success: false,
      message: `server error something went wrong : ${error}`,
    });

    return;
  }
};

export const postsInPagination = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let { page, limit, sort } = req.params as {
      page: string;
      limit: string;
      sort?: string;
    };

    let sortedValue = Number(sort);
    sortedValue = -1;

    if (parseInt(page) <= 0 || parseInt(limit) <= 0) {
      res.status(400).json({
        success: false,
        message: "page or limit must be greater than 0",
      });
      return;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: {
        createdAt: sortedValue,
      },
    };

    const posts = await Post.paginate({}, options);
    if (!posts) {
      res.status(404).json({
        success: false,
        message: "post not found.",
      });
    }

    res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.log(`error while getting posts in pagination formate: ${error}`);
    res.status(500).json({
      success: false,
      message: `server error something went wrong : ${error}`,
    });
  }
};

export const updatePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params as {
      postId: string;
    };

    const { title, description } = req.body as {
      title: string;
      description: string;
    };

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

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, description },
      { new: true }
    );

    if (!updatedPost) {
      res.status(400).json({
        success: false,
        message: "Failed to update post.",
      });
    }

    res.status(201).json({
      success: true,
      message: "your post updated successfully.",
      updatedPost: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error something went wrong: ${error}`,
    });

    console.log(`error while updating post : ${error}`);
  }
};

export const deletePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params as {
      postId: string;
    };

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

    const isPostDeleted = await Post.findById(postId);

    if (isPostDeleted?.isDeleted) {
      res.status(400).json({
        success: false,
        message: "Failed to delete your post or this is already deleted.",
      });
      return;
    } else {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { isDeleted: true } }
      );

      res.status(200).json({
        success: true,
        message: "your post deleted successfully.",
      });
    }
  } catch (error) {
    console.log(`error while deleting post : ${error}`);

    res.status(500).json({
      success: false,
      message: `server error something went wrong : ${error}`,
    });

    return;
  }
};

export const gettingPostBySearching = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let { search, page, limit } = req.query as {
      search: string;
      page: string;
      limit: string;
    };

    if (!search) {
      res.status(400).json({
        success: false,
        message: "search query are not present in your url.",
      });
      return;
    }

    if (!page || !limit) {
      res.status(400).json({
        success: false,
        message: "Page or Limit are not define in your url.",
      });
      return;
    }

    if (parseInt(page) <= 0 || parseInt(limit) <= 0) {
      res.status(400).json({
        success: false,
        message: "page or limit must be greater than 0",
      });
      return;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const isPostAvailable = await Post.findOne({
      title: search,
      description: search,
    });
    if (isPostAvailable?.isDeleted) {
      res.status(404).json({
        success: false,
        message: "this post does not exsit that you are looking for.",
      });
      return;
    }

    const posts = await Post.find({ $text: { $search: search } }).paginate(
      options
    );

    if (!posts) {
      res.status(404).json({
        success: false,
        message:
          "post not found : failed to search your post maybe it is not present.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      yourSearchedPost: posts,
    });
  } catch (error) {
    console.log(
      `error while getting post by searching: ${gettingPostBySearching}`
    );
    res.status(500).json({
      success: false,
      message: `server error something went wrong: ${error}`,
    });
    return;
  }
};

export const getSinglePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    
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

    const isPostExsitWithThisId = await Post.findById(postId);
    if(!isPostExsitWithThisId) {
      res.status(404).json({
          success: false,
          message: "post not found with this post id."
      })
      return;
    }

    console.log(`is post exsit : ${isPostExsitWithThisId}`);
    

    const postViewByUser = await Post.findOne({ viewBy: req.userId });
    if (!postViewByUser) {
      await Post.findByIdAndUpdate(postId, { $push: { viewBy: req.userId } });
      const postViewCount = await Post.findOneAndUpdate(
        { viewBy: req.userId },
        { $inc: { views: 1 } }
      ).populate("writer", "name");

      res.status(201).json({
        success: true,
        singlePosts: postViewCount,
      });

      return;
    } else {
      const singlePost = await Post.findOne({ viewBy: req.userId }).populate(
        "viewBy",
        "name"
      );
      res.status(200).json({
        success: true,
        singlePosts: singlePost,
      });
      return;
    }

    // const postViewByUser = await Post.findById(postId);
  } catch (error) {
    console.log(`error while fecthing single post. ${error}`);

    res.status(500).json({
      success: false,
      message: `server error something went wrong. ${error}`,
    });
    return;
  }
};

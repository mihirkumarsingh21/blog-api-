import type { Response } from "express";
import { Post, PostInterface } from "../models/post.model.js";
import { HydratedDocument } from "mongoose";
import { AuthRequest } from "../middlewares/auth.middleware.js";


export const createPost = async (req: AuthRequest, res: Response): Promise < void > => {
        try {

            const { title, description, like, image } = req.body as {
                title: string,
                description: string,
                like?: number,
                image?: string
            };

            if(!title || !description) {
                res.status(400).json({
                    success: false,
                    message: "Title and Description fields are required."
                })
                return;
            }

            type PostDocumentType = HydratedDocument < PostInterface >

            const createdPost: PostDocumentType = await Post.create({
                writer: req.userId,
                title,
                description,
                like,
                image
            });

            if(!createdPost) {
                res.status(400).json({
                    success: false,
                    message: "Failed to create post."
                })
                return;
            }

            res.status(200).json({
                success: true,
                posts: createdPost
            })

        } catch (error) {
            console.log(`error while creating post: ${error}`);
            
            res.status(500).json({
                success: false,
                message: `server error something went wrong: ${error}`
            })

            return;
        }
} 

export const gettingPost = async (req: AuthRequest, res: Response): Promise < void > => {
    try {        
        const posts = await Post.find().populate("writer", "name");
        if(!posts) {
            res.status(404).json({
                success: false,
                message: "post not found."
            })
            return;
        }

        res.status(200).json({
            success: true,
            posts: posts
        })

    } catch (error) {
        console.log(`error while getting all posts: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        return;
    }
}


export const postsInPagination = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const { page, limit } = req.params as {
            page: string,
            limit: string
        };

        if( parseInt(page) <= 0 || parseInt(limit) <= 0 ) {
            res.status(400).json({
                success: false,
                message: "page or limit must be greater than 0"
            })
            return;
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }

        const posts = await Post.paginate({}, options);
        if(!posts) {
            res.status(404).json({
                success: false,
                message: "post not found."
            })
        }

        res.status(200).json({
            success: true,
            posts: posts 
        })


    } catch (error) {
        console.log(`error while getting posts in pagination formate: ${error}`);
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
    }
}
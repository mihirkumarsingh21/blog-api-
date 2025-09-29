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

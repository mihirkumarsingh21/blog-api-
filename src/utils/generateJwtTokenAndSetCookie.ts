import type { Response } from "express";
import jwt from "jsonwebtoken";

export const generateJsonWebTokenAndSetCookie = async (userId: object, res: Response) => {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token: string = jwt.sign({userId: userId}, secretKey as string, {
            expiresIn: 1000 * 60 * 60 * 24 // 24 hr
        })

        if(!token) return res.status(400).json({
            success: false,
            message: "Failed to generate JWT token."
        })
        
        res.cookie("blogApi", token);

        return token;

    } catch (error) {
        console.log(`error while generating jwt token: ${error}`);
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        }) 
        return;
    }
}
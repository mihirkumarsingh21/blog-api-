import type { Response } from "express";
import jwt from "jsonwebtoken";

export const generateJsonWebTokenAndSetCookie = async (userId: object, res: Response): Promise < void > => {
    try {
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY as string;
        const token: string = jwt.sign({userId}, secretKey, {
            expiresIn: "24hr"
        })

        if(!token) {  
            res.status(400).json({
            success: false,
            message: "Failed to generate JWT token."            
        })
        return;
    }
        res.cookie("blogApi", token);
        // res.send(token);
        return;

    } catch (error) {
        console.log(`error while generating jwt token: ${error}`);
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        }) 
        return;
    }
}
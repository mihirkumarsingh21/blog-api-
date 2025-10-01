
import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";
import { User } from "../models/user.model.js";

export const author = async ( req: AuthRequest, res: Response, next: NextFunction ): Promise < void > => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            res.status(404).json({
                success: false,
                message: "User not found with this id or user unauthorized."
            })
            return;
        }

        if(user.role === "user") {
            res.status(403).json({
                success: false,
                message: " access denied: only author have permission."
            })
            return;
        }
        
        next();

    } catch (error) {
        console.log(`error in author middleware: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        return;
    }
}
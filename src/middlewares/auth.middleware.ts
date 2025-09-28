import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload }  from "jsonwebtoken";
import { User } from "../models/user.model.js";

export interface AuthRequest extends Request {
            userId?: string
        }

export interface JwtPayloadType { // this is the  user data that are store in the jwt token. 
    userId: string
}

export const authProtect = async ( req: AuthRequest, res: Response, next: NextFunction): Promise < void > => {
    try 
    {
        const authToken: string = req.cookies["blogApi"] || req.cookies.blogApi;
        console.log("authToken : " + authToken);
        
        if(!authToken) {
            res.status(404).json({
                success: false,
                message: "JWT Token Not Found"
            })
            return;
        }

        const jwtSecrectKey: string | undefined = process.env.JWT_SECRET_KEY as string;
        const decoded: string | JwtPayload = jwt.verify(authToken, jwtSecrectKey) as JwtPayloadType

        req.userId = decoded.userId;

        const authUser = await User.findById(req.userId);
        if(!authUser) {
            res.status(403).json({
                success: false,
                message: "Unauthorized user exsit."
            })
        }
        
        console.log(`auth user: ${authUser}`);
        
      
        next();

    } catch (error) {
        console.log(`error in auth protected middleware :${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        return;
    }
}
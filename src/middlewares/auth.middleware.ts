import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload }  from "jsonwebtoken";

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
        
        if(!authToken) {
            res.status(404).json({
                success: false,
                message: "JWT Token Not Found : User Unauthorized please login first to create a post."
            })
            return;
        }

        const jwtSecrectKey: string | undefined = process.env.JWT_SECRET_KEY as string;
        const decoded: string | JwtPayload = jwt.verify(authToken, jwtSecrectKey) as JwtPayloadType

        req.userId = decoded.userId;
        console.log(`hello from auth middleware`);
        

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
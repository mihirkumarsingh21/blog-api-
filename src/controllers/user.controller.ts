import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const  registerUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body as {
                name: string,
                email: string,
                password: string
            }

            if(!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "these fields are required."
                })
            }

          const isUserAlreadyExsit = await User.findOne({email});
          if(isUserAlreadyExsit) return res.status(400).json({
                success: false,
                message: "user already present with this credentials"
          })

          const passwordHash = await bcrypt.hash(password, 10);


          const newUser = await User.create({
                name,
                email,
                passworHash: passwordHash
          })

        } catch (error) {
            
        }
} 
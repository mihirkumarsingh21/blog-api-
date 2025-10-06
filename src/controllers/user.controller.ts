import type { Request, Response } from "express";
import { User, type UserInterface } from "../models/user.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import bcrypt from "bcryptjs";
import mongoose, { isValidObjectId } from "mongoose";
// import { AuthRequest } from "../middlewares/auth.middleware.js";
import { generateJsonWebTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.js";

export const  registerUser = async ( req: Request, res: Response ): Promise < void > => {
        try {

            const { name, email, password } = req.body as {
                name: string,
                email: string,
                password: string
            }

            if(!name || !email || !password)  {

                 res.status(400).json({
                    success: false,
                    message: "these fields are required."
                })
            return;
        }

          const isUserAlreadyExsit = await User.findOne({email});
          if(isUserAlreadyExsit) 
          {
             res.status(400).json({
                success: false,
                message: "user already present with this credentials"
          })
          return;
        }

          const passwordHash = await bcrypt.hash(password, 10);

          type UserDocument = mongoose.HydratedDocument < UserInterface >
          const newUser: UserDocument = new User({
            name,
            email,
            passwordHash
          });


          if(!newUser) {
             res.status(400).json({
                sucess: false,
                message: "Failed to create new user."
          })
          return;
        }

         await generateJsonWebTokenAndSetCookie(newUser._id, res);
        
         await newUser.save();

         res.status(200).json({
            success: true,
            message: "user register successfully"
         })

        } catch (error) {
            console.log(`error while login user ${error}`);

           res.status(500).json({
                success: false,
                message: `server error something went wrong: ${error}`
           })

           return;
        
        }
} 

export const loginUser = async ( req: Request, res: Response ): Promise < void > => {
        try {
            const { email, password } = req.body as {
                email: string,
                password: string
            }

            if(!email || !password ) { 
                res.json({
                success: false,
                message: "for login these fields are required."
            }) 
            return;
        }

            const user = await User.findOne({email});
            
            if(!user) {
                res.status(404).json({
                    success: false,
                    message: "user not register with this credentials."
                })
                return;
            }

            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if(!isValidPassword) {
                res.status(400).json({
                    success: false,
                    message: "password are incorrect."
                })
            }

            await generateJsonWebTokenAndSetCookie(user._id, res);
        
             res.status(200).json({
                success: true,
                message: "user login successfully."
            })
          

        } catch (error) {
            console.log(`error while login user: ${error}`);
            
             res.status(500).json({
                success: false,
                message: `server error something went wrong: ${error}`
            })
            return;
        }
}

export const logoutUser = ( req: Request, res: Response ): void => {
    try {

        res.clearCookie("blogApi").status(200).json({
            success: true,
            message: "user logout successfully"
        });

        return;

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while log out user: ${error}`);
        
    }
}


export const updatingAuthUserProfile = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const { profilePic } = req.body as {
            profilePic: string
        }

        if(!profilePic) {
            res.status(400).json({
                success: false,
                message: "Profile pic not provided."
            })
            return;
        }

        const user = await User.findByIdAndUpdate(req.userId, { $set: { profilePic } }, {new: true});
        if(!user) {
            res.status(400).json({
                success: false,
                message: "Failed to update user profile."
            })
            return;
        }

        res.status(201).json({
            success: true,
            message: "your profile updated successfully."
        })


    } catch (error) {
        console.log(`error while updating auth user profile: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        return;
    }
}


export const gettingAuthUserProfile = async (req: AuthRequest, res: Response): Promise < void > => {
    try {

        const {userId} = req.params as {
            userId: string
        }

        if(!userId) {
            res.status(400).json({
                success: false,
                message: "user id are not present in your url."
            })
            return;
        }

        if(!isValidObjectId(userId)) {
            res.status(400).json({
                success: false,
                message: "Invalid user id."
            })
            return;
        }

        const user = await User.findById(userId).select("-email -passwordHash");
        if(!user) {
            res.status(404).json({
                success: false,
                message: "user is not present with this id."
            })
            return;
        }

        res.status(200).json({
            success: true,
            userProfiles: user
        })

    } catch (error) {
        console.log(`error while getting auth user profile: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error}`
        })
        return;
    }
}

export const followTheUser = async (req: AuthRequest, res: Response): Promise < void > => {
    try {
        const {userId} = req.params;
        if(!userId) {
            res.status(400).json({
                success: false,
                message: "user id are not present in your url."
            })
            return;
        }

        if(!isValidObjectId(userId)) {
            res.status(400).json({
                success: false,
                message: "Invalid user id."
            })
            return;
        }

        const user = await User.findOne({
            $or:[
            {
                followers: userId
            },
            {
                following: userId
            }
        ]
    });
        if(!user) {
            await User.findByIdAndUpdate(userId, {$addToSet: { followers: req.userId }});
            await User.findByIdAndUpdate(req.userId, {$addToSet: { following: userId }});
            res.status(200).json({
                success: true,
                message: "user follow."
            })
            return;

        } else {
            await User.findByIdAndUpdate(userId, {$pull: {followers: req.userId}});
            await User.findByIdAndUpdate(req.userId, {$pull: {following: userId}});
            res.status(200).json({
                success: true,
                message: "user unfollow."
            })
            return;
        }

    } catch (error) {
        console.log(`error while follow the user :${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        return;
    }
}




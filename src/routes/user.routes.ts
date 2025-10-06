import express from "express";
import { registerUser, loginUser, logoutUser, updatingAuthUserProfile, gettingAuthUserProfile, followTheUser} from "../controllers/user.controller.js";
import { authProtect } from "../middlewares/auth.middleware.js";


const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/logout", logoutUser);
route.put("/profile/update", authProtect, updatingAuthUserProfile);
route.get("/profile/:userId", gettingAuthUserProfile);
route.patch("/follow/:userId", authProtect, followTheUser);

export default route

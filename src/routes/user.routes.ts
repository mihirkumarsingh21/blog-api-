import express from "express";
import { registerUser, loginUser, logoutUser} from "../controllers/user.controller.js";
// import { authProtect } from "../middlewares/auth.middleware.js";


const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/logout", logoutUser);

export default route

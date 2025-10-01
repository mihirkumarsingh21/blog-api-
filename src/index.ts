
import express, { type Application } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import postRoute from "./routes/posts.routes.js";
import postLikeRoute from "./routes/post.like.route.js"
import commentRoute from "./routes/comment.route.js";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/likes", postLikeRoute);
app.use("/api/v1/comments", commentRoute);


const port: number = Number(process.env.PORT);

app.listen(port, () => {
    console.log(`server is running at : http://localhost:${port}`);
    connectToDatabase();
    
})

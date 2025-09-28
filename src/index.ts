
import express, { type Application } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import userRoute from "./routes/user.routes.js"

dotenv.config();

const app: Application = express();
app.use(express.json());


app.use("/api/v1/users", userRoute);




const port: number = Number(process.env.PORT);

app.listen(port, () => {
    console.log(`server is running at : http://localhost:${port}`);
    connectToDatabase();
    
})

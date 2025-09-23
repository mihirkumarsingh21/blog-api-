
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("hello, TS")
})







app.listen(port, () => {
    console.log(`server is running at : http://localhost:${port}`);
    
})

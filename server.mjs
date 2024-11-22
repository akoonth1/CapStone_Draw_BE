import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectToDatabase from "./config/db.mjs";
import router from "./routes/pageroute.mjs";
import { Schema } from "mongoose";
import book_router from "./routes/book_routes.mjs";


import cors from "cors";
import morgan from "morgan"; // middleware for logging requests



const app = express();
dotenv.config();

connectToDatabase();

let PORT= process.env.PORT || 3000;  // default port to listen


app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/api", router);

app.use("/books", book_router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

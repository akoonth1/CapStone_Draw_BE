import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectToDatabase from "./config/db.mjs";
import page_router from "./routes/page_routes.mjs";
import { Schema } from "mongoose";
import book_router from "./routes/book_routes.mjs";
import user_router from "./routes/user_routes.mjs";
import { errorHandler } from "./middleware/errors_are_mid.mjs";
import router from "./routes/auth_route.mjs";
import color_router from "./routes/color_route.mjs";

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


app.use("/api", page_router);

app.use("/books", book_router);

app.use("/users", user_router);

app.use("/api/auth", router);

app.use("/color", color_router);


app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found, 404' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userType: { type: String, required: false},
    BookArray: { type: Array, required: false },
    Pages: { type: Array, required: false },  // array of page numbers
    // categories: { type: String, required: false },

  });
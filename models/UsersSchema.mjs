import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    userType: { type: String, required: false},
    BookArray: { type: Array, required: false },
    Pages: { type: Array, required: false },  // array of page numbers
    // categories: { type: String, required: false },

  });

const User = mongoose.model("User", userSchema);

export default User
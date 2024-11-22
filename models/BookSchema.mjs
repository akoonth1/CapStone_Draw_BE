import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    BookID: { type: Number, required: false},
    PagesArray: { type: Array, required: true },
    TextArray: { type: Array, required: false },
    PositionArray: { type: Array, required: false },
});


const Book = mongoose.model("Book", bookSchema);

export default Book


import mongoose from "mongoose";
import { Schema } from "mongoose";

const blobSchema = new mongoose.Schema({
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    pictureName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    // categories: { type: String, required: false },

  });
  

const Blob= mongoose.model("Blob", blobSchema);

export default Blob
import mongoose from "mongoose";


const blobSchema = new mongoose.Schema({
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  

const Blob= mongoose.model("Blob", blobSchema);

export default Blob
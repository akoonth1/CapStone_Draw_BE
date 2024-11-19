import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URI; // Database URI
console.log("Connection String: ",  connectionString);

async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to database");
    } catch (error) {


        console.log("Error connecting to database: ", error);

        process.exit(1);
    }

}

export default connectToDatabase;
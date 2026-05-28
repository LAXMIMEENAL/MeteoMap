import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const API_KEY = process.env.WEATHER_API_KEY;
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed", err);
  }
};




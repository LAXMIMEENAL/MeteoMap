
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api", router);
mongoose.connect(process.env.MONGO_URI || "mongodb://mongodb:27017/meteomap", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  city: String,
  country: String,
  user: String // simple user field (later can extend for authentication)
});

export const Favorite = mongoose.model("Favorite", FavoriteSchema);

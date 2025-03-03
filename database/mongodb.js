import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js"; // eslint-disable-line


if (!DB_URI) {
  throw new Error("Mongo URI isnt in .env.*.local");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // eslint-disable-line
  }
}
export default connectToDatabase;
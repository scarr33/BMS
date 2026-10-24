import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseReplicaSet as string);
    // await mongoose.connect(config.databaseUrl as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Failed to connect to database", error);
    process.exit(1);
  }
};

export default connectDB;

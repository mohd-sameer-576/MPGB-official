import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
await User.create({ name: "Test Admin", email: "admin@local", password: "pass123", role: "admin" });
console.log("Created");
process.exit();
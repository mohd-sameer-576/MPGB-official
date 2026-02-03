import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const manageAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database...");

    // 1. Delete the old test admin
    await User.deleteOne({ email: "admin@xmohdsameer576x@gmail.com" });
    console.log("Old admin deleted.");

    // 2. Create the new official admin
    const newAdmin = {
      name: "Official Admin",
      email: "sameer576@mpgb.com", // Change this
      password: "sameermpgb576", // Use a strong password
      role: "admin"
    };

    await User.create(newAdmin);
    console.log("New admin created successfully!");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

manageAdmin();
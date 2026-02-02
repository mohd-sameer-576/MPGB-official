import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set cookie
  const secure = process.env.NODE_ENV === "development" ? false : true;
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "Strict",
    secure,
  });

  // Return token as well (optional)
  res.json({ token });
};

export const logout = (req, res) => {
  const secure = process.env.NODE_ENV === "development" ? false : true;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "Strict", secure });
  res.json({ message: "Logged out" });
};

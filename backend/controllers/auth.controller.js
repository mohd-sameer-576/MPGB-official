import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("-password");
  if (!user) return res.status(404).json({ message: "Admin not found" });

  const fullUser = await User.findOne({ email });
  const match = await bcrypt.compare(password, fullUser.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Cookie config: use 'lax' in development for easier local XHR, 'none' in production
  const secure = process.env.NODE_ENV === "development" ? false : true;
  const sameSite = process.env.NODE_ENV === "development" ? "lax" : "none";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite,
    secure,
  });

  // Return user and token
  res.json({ token, user });
};

export const logout = (req, res) => {
  const secure = process.env.NODE_ENV === "development" ? false : true;
  const sameSite = process.env.NODE_ENV === "development" ? "lax" : "none";
  res.clearCookie("jwt", { httpOnly: true, sameSite, secure });
  res.json({ message: "Logged out" });
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("getMe error", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

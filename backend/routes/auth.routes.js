import express from "express";
import { loginAdmin, logout, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logout);
router.get("/me", getMe);

export default router;

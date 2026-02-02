import express from "express";
import { loginAdmin, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logout);

export default router;

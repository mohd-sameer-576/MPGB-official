import express from "express";
import upload from "../middleware/upload.middleware.js";
import { getProducts, addProduct, deleteProduct } from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, adminOnly, upload.single("image"), addProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
export default router;

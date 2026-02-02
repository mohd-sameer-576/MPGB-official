import express from "express";
import upload from "../middleware/upload.middleware.js";
import { getProducts, addProduct, deleteProduct } from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, adminOnly, upload.single("image"), addProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.post(
  "/test-upload",
  upload.single("image"),
  (req, res) => {
    console.log('test-upload req.file:', req.file);
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded', file: null });
    }
    return res.json({
      message: "Cloudinary connected",
      file: req.file,
    });
  }
);
export default router;

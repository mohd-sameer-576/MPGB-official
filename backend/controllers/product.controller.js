import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("getProducts error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const url = req.file.path || req.file.secure_url || req.file.url;
    const public_id = req.file.filename || req.file.public_id || req.file.id;

    const product = await Product.create({
      name,
      price,
      category,
      description,
      image: {
        url,
        public_id,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("addProduct error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.image && product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("deleteProduct error", error);
    res.status(500).json({ message: "Server error" });
  }
};

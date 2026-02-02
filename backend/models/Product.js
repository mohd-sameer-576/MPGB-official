import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    description: String,
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

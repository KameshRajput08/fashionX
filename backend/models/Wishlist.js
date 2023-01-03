import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    Product: [],
    quantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Wishlist", CartSchema);

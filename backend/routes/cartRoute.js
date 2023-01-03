import express from "express";
import {
  cart,
  deleteCart,
  getAllCarts,
  getCart,
  removeProduct,
  updateQuantity
} from "../controllers/cart.js";
import verify from "../middlewares/verify.js";

const router = express.Router();

router.post("/:id", verify, cart);
router.put("/remove/:id", verify, removeProduct);
router.put("/product/quantity/:id", verify, updateQuantity);
router.delete("/:id", verify, deleteCart);
router.get("/find/:userId", getCart);
router.get("/getAll", getAllCarts);

export default router;

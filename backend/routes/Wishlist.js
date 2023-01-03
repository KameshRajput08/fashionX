import express from "express";
import {
  wishlist,
  deleteWishlist,
  getAllWishlists,
  getWishlist,
  removeProduct,
} from "../controllers/Wishlist.js";
import verify from "../middlewares/verify.js";

const router = express.Router();

router.post("/:id", verify, wishlist);
router.put("/:id/:pId", verify, removeProduct);
router.delete("/:id", verify, deleteWishlist);
router.get("/find/:userId", getWishlist);
router.get("/getAll", getAllWishlists);

export default router;

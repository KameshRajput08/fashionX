import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrder,
  Income,
  placeOrder,
  updateOrder,
} from "../controllers/order.js";
import verify from "../middlewares/verify.js";

const router = express.Router();

router.post("/:id", verify, placeOrder);
router.put("/:id", verify, updateOrder);
router.delete("/:id", verify, deleteOrder);
router.get("/find/:id", verify, getOrder);
router.get("/getAll", getAllOrders);
router.get("/income", verify, Income);

export default router;

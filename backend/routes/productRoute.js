import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.js";
import verify from "../middlewares/verify.js";

const router = express.Router()

router.post("/", createProduct)
router.put("/:id", verify, updateProduct)
router.delete("/:id", verify, deleteProduct)
router.get('/find/:id', getProduct)
router.get('/', getAllProducts)

export default router
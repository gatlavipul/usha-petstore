import express from "express";
import {
  createProduct,
  getProducts,
  getProductById
} from "../controllers/productController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;

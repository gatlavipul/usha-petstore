import express from "express";

import {
	createOrder,
	getMyOrders,
	getAllOrders
} from "../controllers/orderController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// User: Create order
router.post("/", authMiddleware, createOrder);

// User: Get own orders
router.get("/my", authMiddleware, getMyOrders);

// Admin: Get all orders
router.get("/", authMiddleware, adminMiddleware, getAllOrders);

export default router;

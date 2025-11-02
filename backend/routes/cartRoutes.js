import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity, // 1. Import new controller function
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js"; // 2. Import protect middleware

const router = express.Router();

// 3. Secure all cart routes so only logged-in users can access them
router.post("/add", protect, addToCart);
router.get("/:userId", protect, getCart);
router.delete("/remove", protect, removeFromCart);
router.patch("/update", protect, updateQuantity); // 4. Add the new update route

export default router;

import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", protectRoute, addToCart);
router.patch("/update", protectRoute, updateCartItem);
router.delete("/remove", protectRoute, removeFromCart);
router.delete("/clear", protectRoute, clearCart);

export default router;

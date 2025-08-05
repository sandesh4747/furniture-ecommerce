import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersByUser,
  updateAddress,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getOrders);

router.post("/create", protectRoute, createOrder);
router.get("/my-order", protectRoute, getOrdersByUser);
router.get("/:id", protectRoute, getOrderById);
router.patch("/update/:id", protectRoute, updateOrderStatus);
router.delete("/delete/:id", protectRoute, deleteOrder);
router.patch("/:id/address", updateAddress);

export default router;

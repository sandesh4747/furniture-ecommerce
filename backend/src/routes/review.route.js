import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsByProduct,
  updateReview,
} from "../controllers/review.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/", protectRoute, getAllReviews);
router.post("/create", protectRoute, createReview);
router.get("/:productId", protectRoute, getReviewsByProduct);
router.patch("/update/:id", protectRoute, updateReview);
router.delete("/delete/:id", protectRoute, deleteReview);

export default router;

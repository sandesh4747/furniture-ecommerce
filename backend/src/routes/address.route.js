import express from "express";
import {
  createAddress,
  getUserAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-address", protectRoute, createAddress);

router.get("/get-address", protectRoute, getUserAddress);
router.patch("/update-address/:id", protectRoute, updateAddress);

export default router;

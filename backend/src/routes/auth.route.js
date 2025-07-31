import express from "express";
import {
  changePassword,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/changePassword", protectRoute, changePassword);
router.post("/logout", logout);

export default router;

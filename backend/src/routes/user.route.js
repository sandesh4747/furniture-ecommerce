import express from "express";
import {
  getAllUsers,
  getMe,
  toggleFavouriteProduct,
  updateProfile,
  updateProfilePic,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/all-users", protectRoute, getAllUsers);
router.get("/get-me", protectRoute, getMe);
router.patch("/update-profile", protectRoute, updateProfile);
router.patch(
  "/profile-pic",
  upload.single("profilePic"),
  protectRoute,
  updateProfilePic
);

router.patch("/favourites/:id", protectRoute, toggleFavouriteProduct);

export default router;

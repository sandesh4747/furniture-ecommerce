import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getFeaturedProducts,
  getHighPricedProducts,
  getLatestProducts,
  getLowPricedProducts,
  getRelatedProducts,
  getRelevantProducts,
  getSingleProduct,
  toggleFeaturedProduct,
  toggleInStock,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", protectRoute, getAllProduct);
router.post("/create", upload.array("images"), protectRoute, createProduct);

router.get("/latest-products", getLatestProducts);
router.get("/high-priced-products", getHighPricedProducts);
router.get("/low-priced-products", getLowPricedProducts);
router.get("/relevant-products", getRelevantProducts);
router.get("/featured-products", getFeaturedProducts);
router.get("/related-products/:productId", getRelatedProducts);

router.get("/:id", getSingleProduct);
router.patch(
  "/update/:id",
  upload.array("images"),
  protectRoute,
  updateProduct
);

router.patch("/toggle-feature/:id", protectRoute, toggleFeaturedProduct);
router.patch("/toggle-in-stock/:id", protectRoute, toggleInStock);

router.delete("/delete/:id", protectRoute, deleteProduct);

export default router;

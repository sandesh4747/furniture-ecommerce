import { Product } from "../models/Product.js";
import { Review } from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, image } = req.body;
    const userId = req.user._id;

    // check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Prevent multiple reviews from same user
    // const existingReview = await Review.findOne({ user: userId, product: productId });
    // if (existingReview) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You have already reviewed this product",
    //   });
    // }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    // calculating avg rating and review count
    const reviews = await Review.find({ product: productId });
    const avgRating = (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1);

    product.reviews.push(review._id);
    product.avgRating = avgRating;
    product.reviewCount = reviews.length;
    await product.save();

    res.status(200).json({ success: true, review });
  } catch (error) {
    console.log("Error in createReview controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log("Error in getReviewsByProduct controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "username");
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log("Error in getAllReviews controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, comment, image } = req.body;
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    // check if review belongs to user
    if (review.user?.toString() !== userId?.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (image !== undefined) review.image = image;

    const updatedReview = await review.save();
    // calculating avg rating and review count
    const allReviews = await Review.find({ product: review.product });
    const avgRating = (
      allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length
    ).toFixed(1);

    const product = await Product.findById(review.product);

    if (product) {
      product.avgRating = avgRating;
      product.reviewCount = allReviews.length;
      await product.save();
    }

    res.status(200).json({ success: true, review });
  } catch (error) {
    console.log("Error in updateReview controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // check if review belongs to user
    if (review.user?.toString() !== req.user._id?.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await review.deleteOne();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.log("Error in deleteReview controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

import Button from "@material-tailwind/react/components/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { FiFileText } from "react-icons/fi";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByProductQuery,
  useUpdateReviewMutation,
} from "../../features/review/reviewApi";
import { Loader, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { BeautifulSpinner } from "../BeautifulSpinner";
import CustomPagination from "../ShopSection/Pagination";

export default function ProductDetailsTabs({
  product,
  refetch: refetchProduct,
}) {
  const { user } = useSelector((state) => state.userSlice);
  const [deleteReview, { isLoading: deleteReviewLoading }] =
    useDeleteReviewMutation();
  const [createReview, { isLoading: createReviewLoading }] =
    useCreateReviewMutation();
  const { data, isLoading, refetch } = useGetReviewsByProductQuery(product._id);
  const [updateReview, { isLoading: updateReviewLoading }] =
    useUpdateReviewMutation();
  const reviews = data?.reviews;

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");

  const title = [
    { id: "Description", label: "Description" },
    { id: "Additional Information", label: "Additional Information" },
    { id: "Reviews", label: `Reviews [${reviews?.length || 0}]` },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      await createReview({
        productId: product._id,
        rating: userRating,
        comment,
      }).unwrap();
      toast.success("Review added successfully");
      setComment("");
      setUserRating(0);
      await refetchProduct();
      await refetch();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleEditReview = async (review) => {
    setEditingReviewId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditComment("");
    setEditRating(0);
  };
  const handleUpdateReview = async () => {
    if (editRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      await updateReview({
        id: editingReviewId,
        rating: editRating,
        comment: editComment,
      }).unwrap();
      await refetch();
      toast.success("Review updated successfully");
      handleCancelEdit();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId).unwrap();
      await refetch();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // this shows reviews of logged in user first
  const sortedReviews = reviews
    ? [...reviews].sort((a, b) => {
        // Put logged-in user's review first
        if (a.user?._id === user?._id) return -1; //If a is logged‑in user’s review, we say a should come before b` → this moves your review toward the top.
        if (b.user?._id === user?._id) return 1; //If b is logged-in user’s review, we say b should come before a

        // Otherwise sort by newest first
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];
  const totalPages = Math.ceil(sortedReviews?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedReviews?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return <BeautifulSpinner />;
  }
  return (
    <div>
      <div className="flex justify-center gap-5 xl:gap-15 md:gap-10 mb-10 mt-12">
        {title.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.id)}
            className={`${
              activeTab === item.id ? " text-[#000000]" : "text-[#9F9F9F]"
            } text-base sm:text-xl md:text-2xl font-medium   `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="xl:pl-30 pl-10 md:pl-20">
        {activeTab === "Description" && (
          <div className="max-w-[1026px]">
            <p className="text-[#9F9F9F] font-[400]  min-h-[80px] flex items-center text-xl">
              {product?.description ? (
                product.description
              ) : (
                <span className="flex flex-col items-center justify-center text-center w-full py-6 px-4 bg-gray-50/50 rounded-lg border border-dashed border-gray-300">
                  <FiFileText className="text-3xl text-gray-300 mb-3" />
                  <span className="text-gray-400 font-medium text-xl">
                    Oops! No description yet
                  </span>
                  <span className="text-gray-300 text-base mt-1">
                    Our team is working on it
                  </span>
                </span>
              )}
            </p>
          </div>
        )}

        {/* Additional Information */}

        {activeTab === "Additional Information" && (
          <div className="text-gray-700 space-y-4 text-sm md:text-base">
            <p>
              <span className="font-semibold">Dimensions:</span> 84" W x 36" D x
              34" H
            </p>
            <p>
              <span className="font-semibold">Seating Capacity:</span> 3-Seater
            </p>
            <p>
              <span className="font-semibold">Frame Material:</span> Solid Wood
              & Engineered Wood
            </p>
            <p>
              <span className="font-semibold">Upholstery:</span> Premium Linen
              Blend Fabric
            </p>
            <p>
              <span className="font-semibold">Cushion Filling:</span>{" "}
              High-Density Foam + Polyester Fiber
            </p>
            <p>
              <span className="font-semibold">Color:</span> Charcoal Gray
            </p>
            <p>
              <span className="font-semibold">Weight:</span> 85 kg
            </p>
            <p>
              <span className="font-semibold">Assembly:</span> Minimal assembly
              required (legs only)
            </p>
            <p>
              <span className="font-semibold">Care Instructions:</span> Spot
              clean with a damp cloth; avoid direct sunlight to preserve fabric
              quality.
            </p>
            <p>
              <span className="font-semibold">Warranty:</span> 2 Years for
              Manufacturing Defects
            </p>
          </div>
        )}

        {/* Reviews */}

        {activeTab === "Reviews" && (
          <div className="mt-8">
            {/* Header Section */}
            <div className="mb-6 text-center">
              <h3 className="xl:text-2xl md:text-xl text-base font-semibold text-gray-800">
                Customer Reviews
              </h3>
              <p className="text-yellow-500 text-sm md:text-base xl:text-lg mt-1 flex items-center gap-1 justify-center">
                <Rating
                  value={product?.avgRating}
                  name="half-rating"
                  readOnly
                  sx={{
                    color: "#facc15", // Tailwind's yellow-400 HEX
                  }}
                />
                <span className="text-gray-600">
                  {product?.avgRating} out of 5
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Based on {product?.reviewCount} verified reviews
              </p>
            </div>

            {/* Review Cards */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <Typography variant="h5" className="mb-4">
                Write a Review
              </Typography>
              <div className="space-y-4">
                <div>
                  <Typography className="mb-2">Your Rating</Typography>
                  <Rating
                    value={userRating}
                    onChange={(e) => setUserRating(e.target.value)}
                    name="half-rating"
                    precision={0.5}
                    sx={{
                      color: "#facc15", // Tailwind's yellow-400 HEX
                    }}
                  />
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className=" outline-2 outline-orange-500/70 border-none rounded-lg p-2 w-full focus:outline-orange-700 focus:outline-2"
                  placeholder="your review"
                  rows={5}
                />

                <Button
                  disabled={userRating === 0 || createReviewLoading}
                  onClick={handleSubmit}
                  type="submit"
                  className={`mt-2 ${
                    userRating === 0 || createReviewLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-amber-200 text-red-500 hover:bg-amber-300"
                  }`}
                >
                  {createReviewLoading ? (
                    <div className="flex items-center gap-1">
                      <Loader className="animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </div>

            {paginatedProducts?.length > 0 ? (
              <div className="space-y-6">
                {" "}
                <Typography className="mb-4" variant="h5">
                  Reviews
                </Typography>
                {paginatedProducts?.map((review) => (
                  <div
                    key={review._id}
                    className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
                  >
                    {editingReviewId === review._id ? (
                      <div className="space-y-4">
                        <div>
                          <Typography className="mb-2" variant="small">
                            Your Rating
                          </Typography>
                          <Rating
                            value={editRating}
                            onChange={(e) => setEditRating(e.target.value)}
                            name="half-rating"
                            precision={0.5}
                            sx={{
                              color: "#facc15", // Tailwind's yellow-400 HEX
                            }}
                          />
                          <textarea
                            className=" outline-2  outline-orange-500/70   border-none  rounded-lg   p-2   w-full  focus:outline-orange-700    focus:outline-2 "
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            placeholder="your review"
                            rows={5}
                          />

                          <div className="flex gap-2">
                            <Button
                              className="bg-orange-500 text-white"
                              onClick={handleUpdateReview}
                              disabled={updateReviewLoading}
                            >
                              {updateReviewLoading ? (
                                <div className="flex items-center gap-1">
                                  <Loader className="animate-spin" />{" "}
                                  Updating...
                                </div>
                              ) : (
                                "Update"
                              )}
                            </Button>

                            <Button
                              className="bg-gray-600 text-white"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex  items-center gap-3">
                            <div className="flex items-center justify-center gap-2">
                              <span>
                                {" "}
                                {review?.user?.username || "Anonymous"}
                              </span>

                              <Rating
                                value={review?.rating}
                                readOnly
                                name="half-rating"
                                precision={0.5}
                                sx={{
                                  color: "#facc15", // Tailwind's yellow-400 HEX
                                }}
                              />
                            </div>
                            <Typography
                              variant="small"
                              className="text-gray-500"
                            >
                              {new Date(review.createdAt).toLocaleDateString()}
                            </Typography>
                          </div>
                          <Typography
                            variant="small"
                            className="text-gray-700 font-medium   flex items-center gap-5"
                          >
                            {user?._id === review?.user._id && (
                              <span className="flex gap-2">
                                <Pencil
                                  className="w-5 h-5 text-green-500 cursor-pointer"
                                  onClick={() => handleEditReview(review)}
                                />
                                <Trash
                                  className="w-5 h-5 text-red-500 cursor-pointer"
                                  onClick={() => handleDeleteReview(review._id)}
                                />
                              </span>
                            )}
                          </Typography>
                        </div>
                        {review?.comment && (
                          <Typography
                            className="text-gray-800 text-sm leading-relaxed"
                            variant="small"
                          >
                            {review?.comment}
                          </Typography>
                        )}
                      </>
                    )}
                  </div>
                ))}
                {reviews?.length > 0 && (
                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                  />
                )}
              </div>
            ) : (
              <Typography className="text-gray-500">
                No reviews yet. Be the first to review!
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

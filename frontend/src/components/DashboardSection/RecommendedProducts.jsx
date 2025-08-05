import React from "react";
import { useRecommendedProductsQuery } from "../../features/product/productApi";
import { useNavigate } from "react-router-dom";

export default function RecommendedProducts() {
  const { data } = useRecommendedProductsQuery();

  const recommendedProducts = data?.products
    ?.slice() // create a shallow copy to avoid mutating original
    ?.sort(() => Math.random() - 0.5) // shuffle
    ?.slice(0, 4); // take first 4 after shuffle
  const navigate = useNavigate();
  return (
    <div className="bg-[#FFFFFF] px-4 sm:px-6 lg:px-20 pt-20 pb-16">
      {/* Header */}
      <div className="text-center mb-10 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">
          Recommended Products
        </h1>
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-4">
        {recommendedProducts?.map((item) => {
          const hasDiscount = item?.discount > 0;
          const discountedPrice = hasDiscount
            ? (item.price - item.price * (item.discount / 100)).toFixed(2)
            : null;

          return (
            <div
              onClick={() => navigate(`/product-details/${item._id}`)}
              key={item._id}
              className="relative flex flex-col items-center cursor-pointer"
            >
              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  -{item.discount}%
                </div>
              )}

              <img
                src={item?.images[0]?.url}
                alt={item.name}
                className="h-33 md:h-44 object-contain"
              />

              <h2 className="text-sm md:text-base font-normal max-w-[199px] mt-2 text-center">
                {item?.name}
              </h2>

              {hasDiscount ? (
                <div className="mt-1 text-center">
                  <p className="text-sm text-gray-500 line-through">
                    ${item?.price?.toFixed(2)}
                  </p>
                  <p className="text-base md:text-xl xl:text-2xl font-semibold text-red-500">
                    ${discountedPrice}
                  </p>
                </div>
              ) : (
                <p className="xl:text-2xl md:text-xl text-base font-medium mt-2">
                  ${item?.price?.toFixed(2)}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div
        onClick={() => navigate("/shop")}
        className="w-full flex items-center justify-center mt-10"
      >
        <button className="mt-10 text-base sm:text-lg md:text-xl text-black border-b-2 sm:border-b-3 border-black hover:text-[#8B5E3C] hover:border-[#8B5E3C] hover:translate-y-1 transition-all duration-300 pb-2 sm:pb-3 font-medium ">
          View More
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useRelevantProductQuery } from "../../features/product/productApi";
import { useNavigate } from "react-router-dom";

export default function FeaturedTables() {
  const navigate = useNavigate();
  const { data } = useRelevantProductQuery();
  const featuredItems = data?.products;

  const getDiscountedPrice = (price, discount) => {
    return (price - price * (discount / 100)).toFixed(2);
  };

  return (
    <div className="pt-16 flex flex-col items-center justify-center bg-white pb-20 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl">
          Top Picks For You
        </h1>
        <p className="text-[#9F9F9F] pt-4 max-w-[600px] mx-auto text-sm sm:text-base">
          Find a bright ideal to suit your taste with our great selection of
          suspension, floor and table lights.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 px-6 w-full max-w-[1440px]">
        {featuredItems?.slice(0, 4)?.map((item) => {
          const hasDiscount = item?.discount > 0;
          const discountedPrice = hasDiscount
            ? getDiscountedPrice(item.price, item.discount)
            : null;

          return (
            <div
              onClick={() => navigate(`/product-details/${item._id}`)}
              key={item._id}
              className="relative flex flex-col items-center text-center p-4 sm:p-6 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
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
                className="h-[100px] sm:h-[200px] md:h-[190px] lg:h-[230px] w-auto object-contain"
              />

              <h2 className="text-sm sm:text-base font-normal mt-4 mb-2 max-w-[212px]">
                {item.name}
              </h2>

              {hasDiscount ? (
                <div>
                  <p className="text-sm text-gray-500 line-through">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
                    ${discountedPrice}
                  </p>
                </div>
              ) : (
                <p className="text-lg sm:text-xl md:text-2xl font-medium">
                  ${item.price.toFixed(2)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="mt-10 text-base sm:text-lg md:text-xl text-black border-b-2 sm:border-b-3 border-black hover:text-[#8B5E3C] hover:border-[#8B5E3C] hover:translate-y-1 transition-all duration-300 pb-2 sm:pb-3 font-medium"
      >
        View More
      </button>
    </div>
  );
}

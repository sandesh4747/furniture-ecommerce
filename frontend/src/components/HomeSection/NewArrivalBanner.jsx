import React from "react";
import asgaardSofa from "../../assets/img/asgaardSofa.png";
import { useLatestProductQuery } from "../../features/product/productApi";
import { useNavigate } from "react-router-dom";

export default function NewArrivalBanner() {
  const { data } = useLatestProductQuery();
  const singleProduct = data?.products[0];
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF9E5] py-10 px-4 sm:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-center  w-full pt-10 gap-10 lg:gap-20 max-w-[1440px] mx-auto">
        <div className="w-full max-w-[500px]">
          <img
            src={singleProduct?.images[0]?.url}
            alt={singleProduct?.name}
            className="w-full h-auto object-contain "
          />
        </div>
        <div className="text-center space-y-4 lg:text-left">
          <h2 className="font-medium text-lg sm:text-xl md:text-2xl">
            New Arrivals
          </h2>
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            {singleProduct?.name}
          </h1>

          <div
            onClick={() => navigate(`/product-details/${singleProduct?._id}`)}
            className="sm:mt-10 mt-6"
          >
            <button className="text-base sm:text-lg md:text-xl font-medium border border-black px-8 sm:px-12 md:px-14   xl:px-20 py-3 sm:py-4 transition-all duration-300 hover:bg-black hover:text-white">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import instaBg from "../../assets/img/instaBg.jpg";

export default function InstagramFeed() {
  return (
    <div className="bg-white py-10 px-4 sm:px-6">
      <div className="relative h-[300px] sm:h-[400px] md:h-[450px] w-full">
        <img
          src={instaBg}
          alt="Instagram Feed"
          className="h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#FAF4F4]/80"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-black">
            Our Instagram
          </h2>
          <p className="text-sm sm:text-base md:text-xl font-[400] pt-3 sm:pt-5">
            Follow our store in instagram
          </p>
          <button className="mt-4 sm:mt-6 text-sm sm:text-base md:text-xl font-medium bg-[#FAF4F4] px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:bg-[#e5dadb] hover:-translate-y-1 hover:scale-105 text-black">
            Follow Us Follow Us
          </button>
        </div>
      </div>
    </div>
  );
}

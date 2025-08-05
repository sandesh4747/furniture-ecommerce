import React from "react";
import rocketSingleSeater from "../../assets/img/rocket-single-seater-1.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FBEBB5] lg:pt-15  pt-20">
      <div className="flex flex-col lg:flex-row items-center  justify-center gap-10 px-4  lg:pl-20 mt-5">
        <div className="text-center lg:text-left">
          <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] max-w-[440px]">
            Rocket single seater
          </h1>

          <button
            onClick={() => navigate("/shop")}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium pt-6 sm:pt-8 md:pt-10 pb-3 border-b-2 sm:border-b-3 border-black hover:text-[#8B5E3C] hover:border-[#8B5E3C] hover:translate-y-1 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
        <div className="w-fit overflow-hidden rounded-lg">
          <img
            src={rocketSingleSeater}
            alt="Rocket single seater image"
            className="block object-cover  h-auto  w-[740px] scale-x-[-1] filter drop-shadow-[0_28px_30px_rgba(0,0,0,0.1)]"
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";

import shopBg from "../assets/img/shopBg.jpg";
import logo from "../assets/img/logo.png";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Banner({ title }) {
  return (
    <div className="relative">
      <div className=" h-[200px] sm:h-[280px] md:h-[316px] w-full mt-5 blur-[3px]">
        <img
          src={shopBg}
          alt="Shop Background"
          className="h-full w-full object-cover "
        />
        {/* Overlay */}
        <div className="absolute inset-0   bg-[#FAF4F4]/50"></div>
      </div>
      {/* Title & Breadcrumbs */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
        <img src={logo} alt="logo" className="h-18 w-18" />
        <h1 className="text-4xl md:text-5xl font-medium  mb-4">{title}</h1>

        <div className="flex items-center space-x-2 text-base">
          <Link to="/" className="font-medium hover:underline text-base ">
            Home
          </Link>

          <ChevronRight className="w-6 h-6  font-semibold" />

          <span className="text-gray-900 font-light text-base">{title}</span>
        </div>
      </div>
    </div>
  );
}

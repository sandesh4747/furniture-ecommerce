import { ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BreadCrumbs({ product }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-2 mb-4">
      {/* Breadcrumbs Placeholder */}
      <div className="flex items-center  gap-5   text-base font-normal">
        <div className="flex items-center gap-4">
          <p
            onClick={() => navigate("/")}
            className="text-[#9F9F9F] hover:underline cursor-pointer"
          >
            Home
          </p>
          <ChevronRight className=" w-5 h-5" />
        </div>
        <div className="flex items-center gap-4">
          <p
            onClick={() => navigate("/shop")}
            className="text-[#9F9F9F] hover:underline cursor-pointer"
          >
            Shop
          </p>
          <ChevronRight className=" w-5 h-5" />
        </div>
      </div>
      <div className="border-l-2 border-[#9F9F9F] h-9 ml-3" />
      <div className="flex items-center gap-3 ml-5">
        <p className="">{product?.name}</p>
      </div>
    </div>
  );
}

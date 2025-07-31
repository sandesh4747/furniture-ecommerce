import React from "react";
import cloudSofaThreeSeater from "../../assets/img/cloud-sofa-three-seater-ottoman-31.png";
import graniteSquareSideTable from "../../assets/img/granite-square-side-table-1.png";
import { useFeaturedProductQuery } from "../../features/product/productApi";
import { useNavigate } from "react-router-dom";
import { Slice } from "lucide-react";

export default function HighlightTables() {
  const { data } = useFeaturedProductQuery();
  const highlightTables = data?.products;
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF4F4] px-4 sm:px-6 py-16 ">
      <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl mb-12 text-center ">
        Highlight Tables
      </h1>
      <div className="grid grid-cols-2 gap-20 justify-between max-w-7xl mx-auto relative">
        {highlightTables?.slice(0, 2)?.map((table) => (
          <div
            onClick={() => navigate(`/product-details/${table._id}`)}
            key={table._id}
            className="flex flex-col items-center  overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300  "
          >
            <img
              src={table.images[0]?.url}
              alt={table.name}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] xl:h-[500px] object-contain"
            />
            <div className="  py-5 px-4 sm:px-6 text-center">
              <h3 className=" text-xl sm:text-2xl md:text-3xl font-medium mb-4">
                {table.name}
              </h3>
              <button
                onClick={() => navigate("/shop")}
                className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-black border-b-3 border-black hover:opacity-80  pb-3 hover:cursor-pointer  hover:text-[#8B5E3C] hover:border-[#8B5E3C] hover:translate-y-1 transition-all duration-300"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

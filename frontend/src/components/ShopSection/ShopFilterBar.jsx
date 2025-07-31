import React from "react";
import { Icon } from "@iconify/react";

import viewList from "../../assets/img/view-list.svg";
import filterIcon from "../../assets/img/filter-icon.svg";
import grid from "../../assets/img/grid-big-round.svg";
export default function ShopFilterBar({
  currentPage,
  itemsPerPage,
  totalProducts,
  onChangeItemsPerPage,
  selectFilter,
  setSelectFilter,
}) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalProducts);
  return (
    <div className="border-[#9F9F9F] mt-10 mb-4 bg-[#FAF4F4]  h-[150px] lg:h-[100px]">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:justify-between pl-2  sm:px-6 md:px-8 xl:px-20 h-full">
        <div className="flex items-center ">
          <div className="flex items-center gap-4 ">
            <img
              src={filterIcon}
              alt=""
              className="w-4 h-4 sm:h-full sm:w-full"
            />
            <span className="text-sm sm:text-base  xl:text-xl font-normal">
              Filter
            </span>
          </div>

          <div className="flex items-center gap-2  sm:ml-6 ml-2 sm:gap-4">
            <img src={grid} alt="" className="w-4 h-4 sm:h-full sm:w-full" />

            <img
              src={viewList}
              alt=""
              className="w-4 h-4 sm:h-full sm:w-full"
            />
          </div>

          <div className=" border-l-2 border-[#9F9F9F] h-8 ml-4 sm:mx-4 md:mx-6 xl:mx-8">
            <span className="text-sm sm:text-base font-normal ml-3 md:ml-4 xl:ml-6 ">
              Showing {start}-{end} of {totalProducts} results
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 xl:gap-10">
          <div className="inline-flex items-center">
            {" "}
            <span className="text-sm sm:text-base md:text-lg xl:text-xl ">
              Show
            </span>
            <select
              onChange={(e) => onChangeItemsPerPage(Number(e.target.value))}
              className="xl:ml-5 ml-2 md:ml-3 border border-gray-300 rounded-md xl:px-2 xl:py-4 py-2 px-1 bg-white text-gray-400"
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
            </select>
          </div>
          <div className="inline-flex items-center">
            <span className="text-sm sm:text-base md:text-lg xl:text-xl ">
              Short by
            </span>
            <select
              value={selectFilter}
              onChange={(e) => setSelectFilter(e.target.value)}
              className="xl:ml-5 ml-2 md:ml-3 border border-gray-300 rounded-md  xl:px-2 xl:py-4  max-w-30 md:max-w-full bg-white  py-2 px-1  text-gray-400"
            >
              <option value="Relevance">Relevance</option>
              <option value="LowToHigh">Price: Low to High</option>
              <option value="HighToLow">Price: High to Low</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomPagination({
  totalPages,
  currentPage,
  onPageChange,
}) {
  const goToPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center gap-4 pl-3">
      {/* Previous Button */}
      <button
        onClick={() => {
          goToPrev();
        }}
        disabled={currentPage === 1}
        className={`flex sm:px-5 sm:py-3 px-2 py-1   rounded-md text-md font-medium transition ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-[#FFF9E5] text-gray-700 hover:bg-[#FBEBB5]"
        }`}
      >
        ← <span className=" hidden sm:block"></span>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const isActive = currentPage === i + 1;
          return (
            <button
              key={i + 1}
              onClick={() => {
                onPageChange(i + 1);
              }}
              className={`sm:w-12 sm:h-12 w-7 h-7 rounded-sm sm:rounded-md text-sm font-medium transition duration-200
    ${isActive ? "bg-orange-300  text-black" : "bg-orange-100 text-black"}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => {
          goToNext();
          scrollTo(0, 0);
        }}
        disabled={currentPage === totalPages}
        className={`flex sm:px-5 sm:py-3 px-2 py-1 rounded-md text-md font-medium transition ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-[#FFF9E5] text-gray-700 hover:bg-[#FBEBB5]"
        }`}
      >
        <span className=" hidden sm:block"></span> →
      </button>
    </div>
  );
}

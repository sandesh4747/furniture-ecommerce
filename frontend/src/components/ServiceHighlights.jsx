import React from "react";
import StarRating from "./ProductDetails/StarRating";

export default function ServiceHighlights() {
  const list = [
    {
      title: "Free Delivery",
      desc: "For all orders over 50%, consectetur adipiscing elit.",
    },
    {
      title: "90 Days Return",
      desc: "If goods have problems, consectetur adipiscing elit.",
    },
    {
      title: "Secure Payment",
      desc: "100% secure payment, consectetur adipiscing elit.",
    },
  ];
  return (
    <div className=" bg-[#FAF4F4] flex flex-col justify-center sm:flex-row h-auto  md:h-[250px] lg:h-[300px] md:items-center gap-4 md:gap-6 xl:gap-8 text-center p-8 mt-15 md:pl-20">
      {list.map((item, index) => (
        <div key={index} className="text-left  ">
          <h3 className="font-medium text-xl md:text-2xl xl:text-3xl pb-2">
            {item.title}
          </h3>
          <p className="font-normal text-sm md:text-base xl:text-xl text-[#9F9F9F]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

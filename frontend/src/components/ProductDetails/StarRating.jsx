import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating = 4.5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="text-yellow-400 text-base md:text-xl flex space-x-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <FaStar key={i} />;
        if (i === fullStars && hasHalfStar) return <FaStarHalfAlt key={i} />;
        return <FaRegStar key={i} />;
      })}
    </div>
  );
};

export default StarRating;

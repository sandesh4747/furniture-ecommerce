import React from "react";
import millenialDesign1 from "../../assets/img/millenialDesign1.jpg";
import millenialDesign2 from "../../assets/img/millenialDesign2.jpg";
import millenialDesign3 from "../../assets/img/millenialDesign3.jpg";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const navigate = useNavigate();
  const blogs = [
    {
      id: 1,
      title: "Millennial Design Trends",
      image: millenialDesign1,
      description: "Explore the latest trends in millennial design.",
    },
    {
      id: 2,
      title: "Sustainable Living",
      image: millenialDesign2,
      description:
        "Learn how to incorporate sustainability into your lifestyle.",
    },
    {
      id: 3,
      title: "Tech Innovations",
      image: millenialDesign3,
      description: "Discover the newest tech innovations shaping our future.",
    },
  ];

  return (
    <div className="bg-[#FFFFFF] px-4 sm:px-6 lg:px-20 pt-10 pb-16">
      {/* Header */}
      <div className="text-center mb-10 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">
          Our Blogs
        </h1>
        <p className="pt-4 text-sm sm:text-base font-medium text-[#9F9F9F]">
          Find a bright ideal to suit your taste with our great selection
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-col items-center text-center">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover mb-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-base sm:text-lg md:text-xl font-[400]">
              {blog.title}
            </h2>
            <div className="mt-3 group cursor-pointer transition-transform duration-300 hover:translate-y-1">
              <button className="text-base sm:text-lg md:text-xl font-medium text-black transition-colors duration-300 group-hover:text-[#8B5E3C]">
                Read More
              </button>
              <div className="h-0.5 w-20 bg-black group-hover:bg-[#8B5E3C] transition-all duration-300 mx-auto mt-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <div className="inline-block group transition-transform duration-300 hover:translate-y-1 cursor-pointer">
          <button
            onClick={() => {
              navigate("/blog-page");
            }}
            className="text-base sm:text-lg md:text-xl font-medium text-black transition-colors duration-300 group-hover:text-[#8B5E3C]"
          >
            View All
          </button>
          <div className="h-0.5 w-20 bg-black group-hover:bg-[#8B5E3C] transition-all duration-300 mx-auto mt-2"></div>
        </div>
      </div>
    </div>
  );
}

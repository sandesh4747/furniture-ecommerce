import React from "react";
import { Icon } from "@iconify/react";
import blog1 from "../../assets/img/blog1.jpg";
import blog2 from "../../assets/img/blog2.jpg";
import blog3 from "../../assets/img/blog3.jpg";
import postImg1 from "../../assets/img/postImg1.jpg";
import postImg2 from "../../assets/img/postImg2.jpg";
import postImg3 from "../../assets/img/postImg3.jpg";
import postImg4 from "../../assets/img/postImg4.jpg";
import postImg5 from "../../assets/img/postImg5.jpg";
import CustomPagination from "../ShopSection/Pagination";

export default function BlogSection({
  setCurrentPage,
  currentPage,
  itemsPerPage,
}) {
  const blogList = [
    {
      id: 1,
      image: blog1,
      userType: "Admin",
      date: "Jan 20, 2023",
      keyword: "Wood",
      title: "Going all-in with millennnial design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
      icon: {
        admin: (
          <Icon
            className="text-[#9F9F9F]"
            icon="dashicons:admin-users"
            width="24"
            height="24"
          />
        ),
        calender: (
          <Icon
            className="text-[#9F9F9F]"
            icon="uis:calender"
            width="24"
            height="24"
          />
        ),
        tag: (
          <Icon
            className="text-[#9F9F9F]"
            icon="ci:tag"
            width="24"
            height="24"
          />
        ),
      },
    },
    {
      id: 2,
      image: blog2,
      userType: "Admin",
      date: "May 20, 2023",
      keyword: "Homemade",
      title: "Exploring new ways of decorating",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
      icon: {
        admin: (
          <Icon
            className="text-[#9F9F9F]"
            icon="dashicons:admin-users"
            width="24"
            height="24"
          />
        ),
        calender: (
          <Icon
            className="text-[#9F9F9F]"
            icon="uis:calender"
            width="24"
            height="24"
          />
        ),
        tag: (
          <Icon
            className="text-[#9F9F9F]"
            icon="ci:tag"
            width="24"
            height="24"
          />
        ),
      },
    },
    {
      id: 3,
      image: blog3,
      userType: "Admin",
      date: "Aug 20, 2023",
      keyword: "Wood",
      title: "Handmade pieces that took time to make",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
      icon: {
        admin: (
          <Icon
            className="text-[#9F9F9F]"
            icon="dashicons:admin-users"
            width="24"
            height="24"
          />
        ),
        calender: (
          <Icon
            className="text-[#9F9F9F]"
            icon="uis:calender"
            width="24"
            height="24"
          />
        ),
        tag: (
          <Icon
            className="text-[#9F9F9F]"
            icon="ci:tag"
            width="24"
            height="24"
          />
        ),
      },
    },
  ];

  const postList = [
    {
      title: "Going all-in with millennial design",
      img: postImg1,
      date: "Jan 20, 2023",
    },
    {
      title: "Exploring new ways of decorating",
      img: postImg2,
      date: " Jan 20, 2023",
    },
    {
      title: "Handmade pieces that took time to make",
      img: postImg3,
      date: "Jan 20, 2023",
    },
    {
      title: "Modern home in Milan",
      img: postImg4,
      date: "Jan 20, 2023",
    },
    {
      title: "Colorful office redesign",
      img: postImg4,
      date: "Jan 20, 2023",
    },
  ];

  const totalPages = Math.ceil(blogList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = blogList.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      <div className="mt-10 w-full flex flex-col md:flex-row justify-center xl:px-20 md:px-10 px-5 gap-10">
        <div>
          {paginatedProducts.map((item) => (
            <div key={item.id} className="w-full max-w-[820px] mt-15">
              <div className="w-full xl:h-[500px] md:h-[400px] h-[300px]">
                {" "}
                <img
                  src={item.image}
                  alt=""
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-wrap items-center mt-4 gap-5 md:gap-8 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  {item.icon.admin}
                  <p className="font-normal text-sm md:text-base text-[#9F9F9F]">
                    {item.userType}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.icon.calender}
                  <p className="font-normal text-sm md:text-base text-[#9F9F9F]">
                    {item.date}
                  </p>
                </div>
                <div className="flex items-center flex-wrap gap-2 ">
                  {item.icon.tag}
                  <p className="font-normal text-sm md:text-base text-[#9F9F9F]">
                    {item.keyword}
                  </p>
                </div>
              </div>
              <h1 className="font-medium  text-2xl md:text-3xl mt-4">
                {item.title}
              </h1>

              <p className="mt-4 font-normal text-sm md:text-base text-[#9F9F9F] leading-[150%] tracking-normal text-justify">
                {item.description}
              </p>

              <div className="mt-10 group cursor-pointer transition-transform duration-300 hover:translate-y-1 inline-block">
                <button className="text-sm md:text-base  font-medium text-black transition-colors duration-300 group-hover:text-[#8B5E3C]">
                  Read More
                </button>
                <div className="h-0.5 w-15 bg-black group-hover:bg-[#8B5E3C] transition-all duration-300 mx-auto mt-2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Blog Sidebar */}
        <div className="w-full max-w-[393px] px-10 mt-15">
          <div className="relative">
            <input
              className="h-[58px] w-full max-w-[311px] border border-[#9F9F9F] rounded-[10px] px-4"
              type="text"
            />
            <div className="absolute right-3 top-4 ">
              <Icon icon="akar-icons:search" width="24" height="24" />
            </div>
          </div>
          <div className="md:px-10 px-5 py-10">
            <h1 className="text-xl md:text-2xl font-medium">Categories</h1>

            <div className="font-regular text-sm md:text-base text-[#9F9F9F] py-10 space-y-10">
              <span className="flex justify-between">
                <p>Crafts</p>
                <p>2</p>
              </span>
              <span className="flex justify-between">
                <p>Design</p>
                <p>8</p>
              </span>
              <span className="flex justify-between">
                <p>Handmade</p>
                <p>7</p>
              </span>
              <span className="flex justify-between">
                <p>Interior</p>
                <p>1</p>
              </span>
              <span className="flex justify-between">
                <p>Wood</p>
                <p>6</p>
              </span>
            </div>
          </div>

          <div>
            {postList.map((item) => (
              <div key={item.id} className="flex gap-4 mt-10">
                <img
                  src={item.img}
                  alt=""
                  className="w-[80px] h-[80px] object-cover rounded-[10px]"
                />
                <div>
                  <h1 className="font-regular text-sm">{item.title}</h1>
                  <p className="font-normal text-xs text-[#9F9F9F] mt-2">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

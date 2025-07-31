import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../ShopSection/Pagination";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useGetMeQuery } from "../../features/user/userApi";

export default function FavouriteProduct() {
  // const { user } = useSelector((state) => state.userSlice);
  const { data } = useGetMeQuery();
  const user = data?.user;
  const favouriteProducts = user?.favourites || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(favouriteProducts?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = favouriteProducts?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const navigate = useNavigate();
  const getDiscountedPrice = (price, discount) => {
    return (price - price * (discount / 100)).toFixed(2);
  };
  console.log(paginatedProducts);
  return (
    <div className="min-h-[60vh] ">
      {favouriteProducts && favouriteProducts?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-10 max-w-8xl mx-auto">
          {paginatedProducts?.map((item) => {
            const hasDiscount = item?.discount > 0;
            const discountedPrice = hasDiscount
              ? getDiscountedPrice(item.price, item.discount)
              : null;
            return (
              <div
                onClick={() => navigate(`/product-details/${item?._id}`)}
                key={item?._id}
                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center text-center p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
              >
                {/* Discount Badge */}
                {hasDiscount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    -{item.discount}%
                  </div>
                )}

                <div className="flex-grow flex flex-col items-center text-center justify-between">
                  <img
                    src={item?.images[0]?.url}
                    alt={item?.name}
                    className="h-[100px] sm:h-[200px] md:h-[190px] lg:h-[230px] w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-base font-normal text-gray-800">
                      {item.name}
                    </h3>
                    {hasDiscount ? (
                      <>
                        <p className="text-sm text-gray-500 line-through">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-primary text-2xl font-semibold">
                          ${discountedPrice}
                        </p>
                      </>
                    ) : (
                      <p className="text-primary text-2xl font-medium mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="bg-pink-50 p-8 rounded-full mb-6">
            <HeartIcon className="h-16 w-16 text-pink-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Your Favorites List is Empty
          </h3>
          <p className="text-gray-600 max-w-md mb-6">
            You haven't added any products to your favorites yet. Start
            exploring our collection and add items you love!
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-full transition-all duration-300 hover:shadow-md hover:shadow-pink-200 hover:-translate-y-1 hover:scale-105"
          >
            Browse Products
          </button>
        </div>
      )}

      <div className="flex justify-center mt-8">
        {favouriteProducts.length > 0 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}
      </div>
    </div>
  );
}

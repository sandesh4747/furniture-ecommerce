import CustomPagination from "./Pagination";
import { useNavigate } from "react-router-dom";

export default function ProductList({
  products,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const navigate = useNavigate();

  // Helper to calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    return (price - price * (discount / 100)).toFixed(2);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-10 max-w-8xl ">
      {paginatedProducts?.map((item) => {
        const hasDiscount = item?.discount > 0;
        const discountedPrice = hasDiscount
          ? getDiscountedPrice(item.price, item.discount)
          : null;

        return (
          <div
            onClick={() => navigate(`/product-details/${item._id}`)}
            key={item._id}
            className="relative bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center text-center p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
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
                alt={item.name}
                className="h-[100px] sm:h-[200px] md:h-[190px] lg:h-[230px] w-auto object-contain"
              />
              <div>
                <h3 className="text-base font-normal text-gray-800 mt-2">
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

      <div className="col-span-full flex justify-center mt-10">
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

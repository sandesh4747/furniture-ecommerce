import { Card, IconButton, Switch, Typography } from "@material-tailwind/react";
import trentonModularSofa from "../../../assets/img/trenton-modular-sofa1.png";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaCouch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Loader, PlusCircle, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { useState } from "react";
import toast from "react-hot-toast";
import DeletePopup from "./DeletePopup";

import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useToggleFeaturedProductMutation,
  useToggleInStockProductMutation,
} from "../../../features/product/productApi";

import LoadingSpinner from "../../LoadingSpinner";
import sadFace from "../../../assets/img/sadFace.svg";
import CustomPagination from "../../ShopSection/Pagination";

export default function ProductList() {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [toggleInStockProduct] = useToggleInStockProductMutation();
  const [toggleFeaturedProduct] = useToggleFeaturedProductMutation();
  const [deletingId, setDeletingId] = useState(null);
  const { data, isLoading, refetch } = useGetAllProductQuery();

  const [open, setOpen] = useState(false);

  const products = data?.product;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalProducts = products?.length;
  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = products?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalProducts);

  const handleOpen = () => setOpen(!open);
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteProduct(id).unwrap();
      await refetch();
      toast.success("Product deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleInStockProduct(id).unwrap();
      await refetch();
      toast.success("Stock updated");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const handleIsFeatured = async (id) => {
    try {
      await toggleFeaturedProduct(id).unwrap();
      await refetch();
      toast.success("Featured product updated");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (isLoading) return <LoadingSpinner />;

  if (!products || products.length === 0) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <img src={sadFace} alt="Empty" className="w-40 h-40 opacity-70 mb-4" />
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
          No Products Found
        </h2>
        <p className="text-gray-500 max-w-md mb-4">
          You haven’t added any products yet. Start by creating your first
          product and showcase your inventory to your customers.
        </p>
        <button
          onClick={() => navigate("/dashboard/add-product")}
          className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition-all duration-300"
        >
          Add Product
        </button>
      </div>
    );
  }

  return (
    <Card className=" w-full  pb-10">
      <div className="flex md:justify-between md:flex-row flex-col px-20 py-10 border border-b border-blue-gray-50">
        <h1 className="text-xl md:text-2xl xl:text-3xl font-medium pb-4 md:pb-0">
          All Products
        </h1>

        <button
          onClick={() => navigate("/dashboard/add-product")}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-all duration-300  hover:-translate-y-1 hover:scale-105 text-sm sm:text-base w-fit self-start"
        >
          {" "}
          Add Product
        </button>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="py-4 px-6 ">PRODUCT</th>
            <th className="p-4 hidden md:table-cell">CATEGORY</th>
            <th className="p-4 hidden md:table-cell">STOCK / FEATURED</th>
            <th className="p-4 hidden lg:table-cell">SKU</th>
            <th className="p-4 hidden sm:table-cell">PRICE</th>
            <th className="p-4 hidden sm:table-cell text-center">QTY</th>
            <th className="p-4 hidden 2xl:table-cell text-center">STATUS</th>
            <th className="p-4 text-center hidden 2xl:table-cell ">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts?.map((item, index) => {
            const isLast = index === paginatedProducts.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={item._id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="font-normal flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(item)}
                      className="p-2 rounded-full hover:bg-gray-200 transition"
                    >
                      <PlusCircle className="w-6 h-6 text-gray-700  block 2xl:hidden" />
                    </button>
                    <img
                      src={item?.images[0]?.url}
                      className="h-10 w-10"
                      alt=""
                    />
                    <span className=""> {item.name}</span>
                  </div>
                </td>
                <td className={`${classes} hidden md:table-cell`}>
                  <div className="font-normal flex items-center gap-2">
                    <FaCouch
                      size={28}
                      className="text-[#FFAB00] bg-amber-50 rounded-full p-1"
                    />
                    {item.category}
                  </div>
                </td>
                <td className={`${classes} hidden md:table-cell`}>
                  <div className="font-normal flex items-center gap-15">
                    <div className="font-normal  mt-5">
                      <Switch
                        onChange={() => handleToggle(item._id)}
                        color="amber"
                        checked={item.inStock}
                      />
                    </div>
                    <div className="font-normal  mt-5">
                      <Switch
                        onChange={() => handleIsFeatured(item._id)}
                        color="amber"
                        checked={item.isFeatured}
                      />
                    </div>
                  </div>
                </td>
                <td className={`${classes} hidden lg:table-cell`}>
                  <Typography className="font-normal">{item.sku}</Typography>
                </td>
                <td className={`${classes} hidden sm:table-cell`}>
                  <Typography className="font-normal ">
                    ${item.price}
                  </Typography>
                </td>
                <td className={`${classes} hidden sm:table-cell`}>
                  <Typography className="font-normal text-center ">
                    {item.stock}
                  </Typography>
                </td>
                <td className={`${classes} hidden 2xl:table-cell`}>
                  <Typography
                    className={`px-2 py-1 rounded-full text-center font-medium ${
                      item.status === "Published"
                        ? "bg-green-50 text-green-600"
                        : "text-[#FFAB00] bg-amber-50"
                    }`}
                  >
                    {item.status}
                  </Typography>
                </td>
                <td className={`${classes} hidden 2xl:table-cell`}>
                  <Typography
                    as="a"
                    className="font-medium flex justify-center gap-2"
                  >
                    <IconButton
                      className="flex justify-center items-center"
                      color="green"
                      variant="text"
                      onClick={() =>
                        navigate(`/dashboard/edit-product/${item._id}`)
                      }
                    >
                      <FiEdit size={20} />
                    </IconButton>

                    <IconButton
                      className="flex justify-center items-center"
                      color="red"
                      variant="text"
                      disabled={deletingId === item._id}
                      onClick={() => {
                        setDeletingId(item._id);
                        handleOpen();
                      }}
                    >
                      {deletingId === item._id ? (
                        <Loader className="animate-spin w-5 h-5" />
                      ) : (
                        <FiTrash size={20} />
                      )}
                    </IconButton>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <span className="flex items-center justify-between mt-6 px-5">
        <p className="text-[#A7ACB2] text-xs sm:text-base">
          Showing {start} to {end} of {totalProducts} entries
        </p>
        <CustomPagination
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />
      </span>

      <div className="bg-white">
        <DeletePopup
          open={open}
          loading={isDeleting}
          onClose={() => setOpen(false)}
          onConfirm={() => handleDelete(deletingId)}
        />
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center px-4 "
          onClick={() => setSelectedProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-xl w-full shadow-lg rounded-xl p-6 relative"
          >
            {" "}
            <ProductCard
              key={selectedProduct._id}
              handleIsFeatured={handleIsFeatured}
              handleToggle={handleToggle}
              product={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              open={open}
              setOpen={setOpen}
              handleOpen={handleOpen}
              handleDelete={handleDelete}
              setDeletingId={setDeletingId}
            />
            <div
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <X />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

import { Switch } from "@material-tailwind/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCouch } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeletePopup from "./DeletePopup";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  handleIsFeatured,
  handleToggle,
  product,
  open,
  setOpen,
  handleDelete,
  setDeletingId,
  setSelectedProduct,
  handleOpen,
}) {
  const [localProduct, setLocalProduct] = useState(product);

  const toggleStock = async () => {
    await handleToggle(localProduct._id);
    setLocalProduct((prev) => ({
      ...prev,
      inStock: !prev.inStock,
    }));
  };

  const toggleFeatured = async () => {
    await handleIsFeatured(localProduct._id);
    setLocalProduct((prev) => ({
      ...prev,
      isFeatured: !prev.isFeatured,
    }));
  };

  const navigate = useNavigate();
  return (
    <div className=" bg-white  text-sm sm:text-base relative ">
      <h4 className="font-medium text-2xl mb-6">
        Details of {localProduct?.name}
      </h4>

      <div className="grid grid-cols-[100px_1fr] gap-y-4 ">
        <div className="text-gray-500   font-medium">Product:</div>
        <div className="flex items-center gap-4 flex-wrap">
          <img
            src={localProduct?.images[0]?.url}
            alt="product"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="font-semibold ">{localProduct?.name}</p>
            <p className="text-gray-500">
              {localProduct?.description || "No description"}
            </p>
          </div>
        </div>

        <div className="text-gray-500 font-medium">Category:</div>
        <div className="flex items-center gap-2">
          <FaCouch
            size={24}
            className="text-[#FFAB00] bg-amber-100 rounded-full p-1"
          />
          <span>{localProduct?.category}</span>
        </div>

        <div className="text-gray-500 font-medium">Stock:</div>
        <div>
          <Switch
            onChange={toggleStock}
            color="amber"
            checked={localProduct.inStock}
          />
        </div>
        <div className="text-gray-500 font-medium">Featured:</div>
        <div>
          <Switch
            onChange={toggleFeatured}
            color="amber"
            checked={localProduct.isFeatured}
          />
        </div>

        <div className="text-gray-500 font-medium">SKU:</div>
        <div>{localProduct?.sku}</div>

        <div className="text-gray-500 font-medium">Price:</div>
        <div>${localProduct?.price}</div>

        <div className="text-gray-500 font-medium">Qty:</div>
        <div>{localProduct?.stock}</div>

        <div className="text-gray-500 font-medium">Status:</div>
        <div>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              localProduct?.status === "Publish"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-yellow-800"
            }`}
          >
            {localProduct?.status}
          </span>
        </div>

        <div className="text-gray-500 font-medium">Actions:</div>
        <div className="flex gap-4">
          <FiEdit
            onClick={() =>
              navigate(`/dashboard/edit-product/${localProduct._id}`)
            }
            className="hover:text-blue-500 cursor-pointer"
            size={20}
          />
          <FiTrash
            onClick={() => {
              handleOpen();
              setDeletingId(localProduct_id);
              setSelectedProduct(null);
            }}
            className="hover:text-red-500 cursor-pointer"
            size={20}
          />
        </div>
      </div>

      <div className="bg-white">
        <DeletePopup
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}

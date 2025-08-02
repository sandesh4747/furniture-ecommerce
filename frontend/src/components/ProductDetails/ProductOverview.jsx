import React, { useEffect, useState } from "react";

import StarRating from "./StarRating";
import Rating from "@mui/material/Rating";

import { Plus, Minus } from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Heart } from "lucide-react";
import {
  useFavouritesProductsMutation,
  useGetMeQuery,
} from "../../features/user/userApi";
import { toast } from "react-hot-toast";
import { useAddCartMutation } from "../../features/cart/cartApi";
import { useNavigate } from "react-router-dom";

export default function ProductOverview({ product, isLoading }) {
  const [addCart, { isLoading: isAdding }] = useAddCartMutation();
  const navigate = useNavigate();
  const { data, refetch } = useGetMeQuery();
  const user = data?.user;

  const [favouriteProduct] = useFavouritesProductsMutation();

  const isFavorited = user?.favourites?.some(
    (fav) => fav._id?.toString() === product?._id?.toString()
  );

  const [localFavourite, setLocalFavourite] = useState(isFavorited);

  useEffect(() => {
    setLocalFavourite(isFavorited);
  }, [isFavorited]);

  const list = [
    {
      name: "SKU",
      value: product?.sku,
    },
    {
      name: "Category",
      value: product?.category,
    },
    {
      name: "Tags",
      value: product?.tags?.join(", ") || "No tags found",
    },
    {
      name: "Share",
      value: {
        facebook: <FaFacebook />,
        linkedin: <FaLinkedin />,
        twitter: <FaTwitter />,
      },
    },
  ];

  const [count, setCount] = useState(1);
  // console.log(product?.stock);

  const firstImage = product?.images[0];

  const [thumbnail, setThumbnail] = useState(firstImage);
  useEffect(() => {
    if (product?.images?.[0]) {
      setThumbnail(product.images[0]);
    }
  }, [product]);

  const handleFavouriteProduct = async () => {
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }
    try {
      await favouriteProduct(product?._id).unwrap();
      toast.success(
        localFavourite ? " Removed from favorites" : " Added to favorites"
      );
    } catch (error) {
      toast.error(error?.data?.message);
      setLocalFavourite((prev) => !prev);
    }
  };

  const handleAddCart = async () => {
    // Find if the product is already in the cart
    const cartItem = user?.cart?.find(
      (item) => item?.product?._id === product._id
    );
    const currentQty = cartItem?.quantity || 0;

    // Check total quantity after adding
    if (currentQty + count > product?.stock) {
      toast.error(`Only ${product?.stock} items in stock`);
      return;
    }

    try {
      await addCart({ productId: product?._id, quantity: count }).unwrap();
      await refetch();
      toast.success("Added to cart successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const discountedPrice =
    product?.price - (product?.price * product?.discount) / 100;

  return (
    <div className="flex flex-col xl:flex-row gap-10 mt-15 items-center justify-center xl:items-start ">
      <div className="flex  xl:flex-col xl:items-center gap-3 xl:justify-center">
        {product?.images?.map((img, index) => (
          <div
            className={` rounded-[10px] xl:h-[80px] xl:w-[76px] md:[h-60px] md:w-[56px] h-[50px] w-[50px] px-1 bg-[#FFF9E5] flex items-center justify-center ${
              img?.url === thumbnail?.url && "outline-3 outline-red-400/70"
            }`}
            key={index}
          >
            <img
              onClick={() => setThumbnail(img)}
              className="object-cover w-full h-full"
              src={img?.url}
              alt={`Product ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="xl:h-[500px]  md:h-[400px] xl:w-[423px] md:w-[300px] w-[250px] h-[250px] bg-[#FFF9E5] rounded-[10px] flex items-center justify-center px-2">
        <img
          src={thumbnail?.url}
          alt="Outdoor Sofa Set"
          className="w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="xl:pl-15 pl-5 xl:w-150">
        <div>
          <h1 className="text-3xl md:text-4xl xl:text-[42px] font-regular">
            {product?.name}
          </h1>
          {product?.discount > 0 ? (
            <div className="mt-2">
              <p className="text-[#9F9F9F] line-through text-lg font-medium">
                ${product?.price?.toFixed(2)}
              </p>

              {/* Stock Status */}

              <p className="text-2xl font-semibold text-red-500">
                $
                {(
                  product?.price -
                  (product?.price * product?.discount) / 100
                ).toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="xl:text-2xl md:text-xl text-lg font-medium text-[#9F9F9F] mt-2">
              ${product?.price?.toFixed(2)}
            </p>
          )}
          <div className="mt-2">
            {product?.stock > 10 && (
              <p className="text-green-600 font-medium">
                In Stock ({product.stock} available)
              </p>
            )}

            {product?.stock > 0 && product?.stock <= 10 && (
              <p className="text-orange-500 font-medium">
                Hurry! Only {product.stock} left in stock
              </p>
            )}

            {product?.stock === 0 && (
              <p className="text-red-500 font-medium">Out of Stock</p>
            )}
          </div>

          <div className="flex items-center gap-5 mt-2  ">
            {" "}
            <Rating
              value={product?.avgRating}
              name="half-rating"
              precision={0.5}
              readOnly
              sx={{
                color: "#facc15", // Tailwind's yellow-400 HEX
              }}
            />
            <div className="border-l-2 border-[#9F9F9F] h-9" />
            <p className="text-[#9F9F9F] text-[13px] font-regular">
              {product?.reviewCount} Customer Review
            </p>
          </div>

          {/* Description */}
          <p className="w-full xl:max-w-[424px] text-[13px] font-regular mt-4">
            {product?.description ||
              "No description available for this product"}
          </p>

          {/* Size */}
          <div className="mt-5">
            <p className="text-sm font-regular text-[#9F9F9F]">Size</p>
            <div className="flex gap-5 mt-2">
              <div className="w-[30px] h-[30px] bg-[#FBEBB5] rounded-[5px] flex justify-center items-center font-regular text-[13px]">
                L
              </div>
              <div className="w-[30px] h-[30px] bg-[#FAF4F4] rounded-[5px] flex justify-center items-center font-regular text-[13px]">
                XL
              </div>
              <div className="w-[30px] h-[30px] bg-[#FAF4F4] rounded-[5px] flex justify-center items-center font-regular text-[13px]">
                XS
              </div>
            </div>
          </div>
        </div>
        {/* Color */}
        <div className="mt-5">
          <p className="text-sm font-regular text-[#9F9F9F]">Color</p>
          <div className="flex gap-5 mt-2">
            <div className="bg-[#816DFA] w-[30px] h-[30px] rounded-full" />
            <div className="bg-[#000000] w-[30px] h-[30px] rounded-full" />
            <div className="bg-[#CDBA7B] w-[30px] h-[30px] rounded-full" />
          </div>
        </div>

        {/* Quantity */}
        <div className="flex gap-4 mt-5">
          <button
            disabled={product?.stock === 0}
            className={`border rounded-[10px] flex items-center justify-between gap-2 md:gap-6 px-2 md:px-4 text-sm md:text-base
      ${
        product?.stock === 0
          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
          : "border-[#9F9F9F] hover:border-black hover:bg-gray-100 transition duration-200"
      }`}
          >
            {/* Minus Button */}
            <Minus
              className={`w-4 h-4 ${
                count === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (count > 1) setCount(count - 1);
              }}
            />

            <p className="w-6 text-center">{count}</p>

            {/* Plus Button */}
            <Plus
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                if (count < product?.stock) {
                  setCount(count + 1);
                } else {
                  toast.error(`Only ${product?.stock} items in stock`);
                }
              }}
            />
          </button>

          {/* Add to Cart Button */}
          <button
            disabled={product?.stock === 0}
            onClick={() => {
              if (!user) return navigate("/auth-page");
              handleAddCart();
            }}
            className={`md:py-5 sm:py-3 py-2 rounded-[10px] flex items-center justify-between px-6 sm:px-10 md:px-12 transition-all duration-200
    ${
      product?.stock === 0
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "border hover:bg-black hover:text-white"
    }`}
          >
            <p className="font-xl rounded-[15px] font-regular text-sm md:text-base">
              Add to Cart
            </p>
          </button>
        </div>

        {/* Share */}
        <div className="h-[1px] mt-15 w-full bg-[#D9D9D9] "></div>

        <div className="space-y-5 mt-10">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <p className="w-24 text-base text-[#9f9f9f] font-medium">
                {item.name}
              </p>
              <p className="text-base text-[#9f9f9f] font-medium mr-2">:</p>

              {item.name === "Share" ? (
                <div className="flex gap-6 text-xl ">
                  {item.value.facebook}
                  {item.value.linkedin}
                  {item.value.twitter}
                </div>
              ) : (
                <p className="text-base text-[#9f9f9f]">{item.value}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Heart
            onClick={handleFavouriteProduct}
            className={`w-6 h-6 cursor-pointer ${
              localFavourite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

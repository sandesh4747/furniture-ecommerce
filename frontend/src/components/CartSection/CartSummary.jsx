import React, { useState } from "react";
import { Icon } from "@iconify/react";

import addToCart from "../../assets/img/add-to-cart.png";

import { toast } from "react-hot-toast";
import {
  useClearCartMutation,
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "../../features/cart/cartApi";

import { useGetMeQuery } from "../../features/user/userApi";
import { Loader, Loader2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { data, refetch } = useGetMeQuery();
  const [selectId, setSelectId] = useState(null);
  const user = data?.user;
  const [removeCart, { isLoading: removeCartLoading }] =
    useRemoveCartMutation();
  const [clearCart, { isLoading: clearCartLoading }] = useClearCartMutation();
  const [updateCart, { isLoading: updateCartLoading }] =
    useUpdateCartMutation();
  const [loadingItem, setLoadingItem] = useState({ id: null, action: null });

  const navigate = useNavigate();

  const cart = user?.cart;

  const subtotal = cart?.reduce((acc, item) => {
    const price = item?.product?.discount
      ? (
          item?.product?.price -
          (item?.product?.price * item?.product?.discount) / 100
        ).toFixed(2)
      : item?.product?.price.toFixed(2);
    return acc + price * item.quantity.toFixed(2);
  }, 0);

  const total = subtotal.toFixed(2);

  const handleRemoveCart = async (productId) => {
    setSelectId(productId);
    try {
      await removeCart({ productId }).unwrap();
      await refetch();

      toast.success("Cart removed successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setSelectId(null);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      await refetch();
      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleUpdateCart = async (productId, quantity, action) => {
    setLoadingItem({ id: productId, action });
    try {
      await updateCart({ productId, quantity }).unwrap();
      await refetch();
      if (action === "increment") {
        toast.success("Added to cart successfully");
      } else if (action === "decrement") {
        toast.success("Removed from cart successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setLoadingItem({ id: null, action: null });
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="mt-20 px-5 lg:px-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <img
            src={addToCart}
            alt="Empty cart"
            className="w-64 h-64 mx-auto mb-8"
          />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up!
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 px-5 lg:px-20 flex flex-col xl:flex-row gap-10 ">
      <div className="w-full xl:w-[70%]  overflow-x-auto">
        {/* Header Row */}
        <div className="min-w-[500px] flex flex-col gap-6 ">
          <div className="bg-[#FFF9E5] text-sm md:text-base  font-medium flex items-center lg:py-4 lg:px-16 py-2 rounded-md">
            <div className="flex-[2]">Product</div>
            <div className="flex-1 text-center">Price</div>
            <div className="flex-1 text-center">Quantity</div>
            <div className="flex-1 text-center">Subtotal</div>
            <div className="w-[40px]"></div>
          </div>

          {/* Product Rows */}
          <div className="flex flex-col gap-4 lg:px-5">
            {cart?.map((item, i) => (
              <div
                key={item._id}
                className="flex items-center lg:py-4 lg:px-9 bg-white shadow-sm rounded-md"
              >
                <div className="flex items-center gap-4 flex-[2]">
                  <div className="h-[80px] w-[80px] md:h-[106px] md:w-[106px] rounded-[10px] bg-[#FBEBB5] flex items-center justify-center">
                    <img
                      src={item?.product?.images[0]?.url}
                      alt={item?.product?.name}
                      className="h-20 w-auto"
                    />
                  </div>
                  <p className="text-sm md:text-base font-normal text-[#9F9F9F]">
                    {item?.product?.name}
                  </p>
                </div>
                <div className="flex-1 text-center text-sm md:text-base font-normal text-[#9F9F9F]">
                  $
                  {item?.product?.discount
                    ? (
                        item?.product?.price -
                        (item?.product?.price * item?.product?.discount) / 100
                      ).toFixed(2)
                    : item?.product?.price?.toFixed(2)}
                </div>

                <div className="flex-1 text-center flex justify-center items-center gap-2">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        handleUpdateCart(
                          item._id,
                          item.quantity - 1,
                          "decrement"
                        );
                      }
                    }}
                    className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded transition-colors ${
                      item.quantity === 1
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "hover:bg-orange-200"
                    }`}
                    disabled={item.quantity === 1}
                  >
                    {loadingItem?.id === item._id &&
                    loadingItem?.action === "decrement" ? (
                      <Loader2 className="animate-spin " />
                    ) : (
                      <Minus size={16} />
                    )}
                  </button>
                  <div className="min-w-[40px] h-8 flex items-center justify-center border border-gray-400 rounded text-sm md:text-base">
                    {item?.quantity}
                  </div>
                  <button
                    onClick={() => {
                      if (item.quantity < item?.product?.stock) {
                        handleUpdateCart(
                          item._id,
                          item.quantity + 1,
                          "increment"
                        );
                      } else {
                        toast.error(
                          `Only ${item?.product?.stock} items in stock`
                        );
                      }
                    }}
                    className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded transition-colors ${
                      item.quantity >= item?.product?.stock
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "hover:bg-orange-200"
                    }`}
                    disabled={item.quantity >= item?.product?.stock}
                  >
                    {loadingItem?.id === item._id &&
                    loadingItem?.action === "increment" ? (
                      <Loader2 className="animate-spin " />
                    ) : (
                      <Plus size={16} />
                    )}
                  </button>
                </div>
                <div className="flex-1 text-center text-sm md:text-base ">
                  $
                  {item?.product?.discount
                    ? (
                        (item?.product?.price -
                          (item?.product?.price * item?.product?.discount) /
                            100) *
                        item.quantity
                      ).toFixed(2)
                    : (item?.product?.price * item.quantity).toFixed(2)}
                </div>

                <div className="w-[40px] text-center cursor-pointer">
                  {removeCartLoading && selectId === item._id ? (
                    <Loader className="animate-spin text-orange-400" />
                  ) : (
                    <Icon
                      className=" "
                      onClick={() => handleRemoveCart(item._id)}
                      icon="ant-design:delete-filled"
                      width="24"
                      height="24"
                      color="orange"
                    />
                  )}
                </div>
              </div>
            ))}
            <div onClick={handleClearCart} className="flex justify-end">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                {clearCartLoading ? (
                  <div className="flex items-center gap-1">
                    <Loader className="animate-spin text-white" />
                    Clearing...
                  </div>
                ) : (
                  "Clear Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Totals */}
      <div className="w-full xl:w-[40%] bg-[#FFF9E5] sticky  self-start top-20 h-[300px]">
        <div className="px-10">
          <h1 className="text-center text-xl  md:2xl  xl:text-3xl font-semibold p-4">
            Cart Totals
          </h1>
          <div className="font-normal text-base flex justify-between p-4">
            <p className="font-medium text-sm md:text-base">Subtotal</p>
            <p className="text-[#9F9F9F] font-normal text-sm md:textbase">
              ${subtotal.toFixed(2)}
            </p>
          </div>
          <div className="  flex justify-between p-4">
            <p className="font-medium text-sm md:text-base">Total</p>
            <p className=" font-medium text-sm  md:text-base xl:text-xl text-[#B88E2F]">
              ${total}
            </p>
          </div>
          <div
            onClick={() => navigate("/checkout")}
            className="flex justify-center"
          >
            <button className="w-full mt-4 md:mt-6 border border-black py-2 md:py-3 rounded-lg text-sm md:text-base font-normal hover:bg-black hover:text-white transition-colors max-w-[300px] ">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

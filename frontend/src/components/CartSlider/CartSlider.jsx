import React, { useState } from "react";
import cartClose from "../../assets/img/cart-close.svg";

import close from "../../assets/img/close.svg";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../features/user/userApi";
import { useRemoveCartMutation } from "../../features/cart/cartApi";
import toast from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";

export default function CartSlider({ setCartSelected }) {
  const { data, refetch } = useGetMeQuery();
  const [removeCart, { isLoading: removeCartLoading }] =
    useRemoveCartMutation();
  const [selectId, setSelectId] = useState(null);
  const user = data?.user;
  const cart = user?.cart;

  // const subtotal = cart?.reduce(
  //   (acc, item) => acc + item?.product?.price * item.quantity,
  //   0
  // );

  const subtotal = cart?.reduce((acc, item) => {
    const price = item?.product?.discount
      ? (
          item?.product?.price -
          (item?.product?.price * item?.product?.discount) / 100
        ).toFixed(2)
      : item?.product?.price;
    return acc + price * item.quantity.toFixed(2);
  }, 0);

  const total = subtotal;

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
  const navigate = useNavigate();

  return (
    <div className=" max-h-screen w-full max-w-md sm:max-w-lg bg-white px-4 sm:px-6 md:px-8 py-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-2xl text-black">Shopping Cart</h1>
        <img
          onClick={() => setCartSelected(false)}
          src={cartClose}
          alt="Close cart"
          className="w-6 h-6 cursor-pointer"
        />
      </div>

      <div className="border-b border-[#D9D9D9] mb-4" />

      {/* Scrollable area */}

      {!cart || cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-40 h-40 bg-[#FBEBB5] rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-[#B88E2F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-600 text-center mb-6 max-w-xs">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            onClick={() => {
              navigate("/shop");
              setCartSelected(false);
            }}
            className="px-6 py-2 bg-[#B88E2F] text-white rounded-2xl hover:bg-[#9a7627] transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex  flex-col  gap-5 overflow-y-auto min-h-[60vh]  sm:max-h-[70vh] pr-2">
          {cart?.map((item) => (
            <div key={item._id} className="flex items-center justify-between ">
              <div className="rounded-xl h-[90px] w-[90px] sm:h-[105px] sm:w-[105px] p-2 bg-[#FBEBB5] flex-shrink-0">
                <img
                  src={item?.product?.images[0]?.url}
                  alt={item?.product?.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1 ml-4 min-w-0">
                <p className="font-normal text-base truncate">
                  {item?.product?.name}
                </p>
                <div className="flex gap-2 items-center text-sm text-gray-700">
                  <span>{item?.quantity}</span>
                  <span>x</span>
                  <span className="font-semibold text-[#B88E2F]">
                    $
                    {item?.product?.discount
                      ? (
                          item?.product?.price -
                          (item?.product?.price * item?.product?.discount) / 100
                        ).toFixed(2)
                      : item?.product?.price?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                {selectId === item._id && removeCartLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <img
                    onClick={() => handleRemoveCart(item?._id)}
                    src={close}
                    alt="Remove item"
                    className="w-5 h-5 cursor-pointer"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`${!cart || cart.length === 0 ? "hidden" : ""}`}>
        <div
          className={`border-t border-[#D9D9D9] mt-6 pt-4 flex justify-between items-center`}
        >
          <p className="font-normal text-base">Subtotal</p>
          <p className="text-base font-semibold text-[#B88E2F]">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between ">
          <button
            onClick={() => {
              navigate("/cart-page");
              setCartSelected(false);
            }}
            className="w-full sm:w-auto px-6 py-2 border rounded-2xl hover:bg-black hover:text-white transition duration-200"
          >
            View Cart
          </button>
          <button
            onClick={() => {
              navigate("/checkout");
              setCartSelected(false);
            }}
            className="w-full sm:w-auto px-6 py-2 border rounded-2xl hover:bg-black hover:text-white transition duration-200"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

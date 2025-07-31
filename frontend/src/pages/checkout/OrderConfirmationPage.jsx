import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle,
  Truck,
  Home,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import { useGetSingleOrderQuery } from "../../features/order/orderApi";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetSingleOrderQuery(id);
  const order = data?.order;

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg">Loading your order...</div>
      </div>
    );
  }

  // Show error or not found
  if (isError || !order) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Order Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          We couldn't find an order with the provided ID. Please check the link
          or try again later.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  // Calculate estimated delivery date (3-5 business days from now)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(
    estimatedDelivery.getDate() + 3 + Math.floor(Math.random() * 3)
  );
  const formattedDeliveryDate = estimatedDelivery.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Calculate subtotal (discounted)
  const subtotal = order.items.reduce((acc, item) => {
    const discount = item.product?.discount || 0;
    const discountedPrice = item.product
      ? item.product.price * (1 - discount / 100)
      : item.price;
    return acc + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="my-20 px-4 sm:px-10 md:px-14 lg:px-30 ">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. We've received your order #
            {order.orderNumber}.
          </p>
          <div className="mt-4 bg-[#FFF9E5] border border-[#FBEBB5] text-[#B88E2F] px-4 py-3 rounded-lg inline-block">
            <p className="font-medium">Order #: {order.orderNumber}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            {["Order Placed", "Processing", "Shipped", "Delivered"].map(
              (step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index === 0
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index === 0 ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      index === 0 ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="text-center text-[#B88E2F] font-medium">
            <Truck className="inline-block mr-2 h-4 w-4" />
            Estimated Delivery: {formattedDeliveryDate}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-400 pb-2">
            Order Summary
          </h2>
          <div className="space-y-4">
            {order?.items?.map((item, index) => {
              const product = item.product;
              const discount = product?.discount || 0;
              const price = product?.price || item.price;
              const discountedPrice = price * (1 - discount / 100);
              const imageUrl = product?.images?.[0]?.url;

              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-gray-400"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="h-6 w-6 text-gray-400 m-auto" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{product?.name}</h3>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-400">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4">
              <span>Total</span>
              <span className="text-[#B88E2F]">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-400">
            Shipping Information
          </h2>
          <div className="bg-[#FFF9E5] p-4 rounded-lg">
            <p className="font-medium">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-gray-600">
              {order.shippingAddress.streetAddress}
            </p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
              {order.shippingAddress.zipCode}
            </p>
            <p className="text-gray-600">{order.shippingAddress.country}</p>
            {order.shippingAddress.phone && (
              <p className="text-gray-600 mt-2">
                Phone: {order.shippingAddress.phone}
              </p>
            )}
            {order.shippingAddress.email && (
              <p className="text-gray-600">
                Email: {order.shippingAddress.email}
              </p>
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-400">
            Payment Method
          </h2>
          <div className="bg-[#FFF9E5] p-4 rounded-lg">
            <p className="font-medium capitalize">
              {order.paymentMethod === "cashOnDelivery"
                ? "Cash on Delivery"
                : order.paymentMethod}
            </p>
            <p className="text-gray-600 mt-1">
              Status: {order.paymentStatus || "Pending"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="flex-1 border border-[#B88E2F] text-[#B88E2F] hover:bg-[#FFF9E5] py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help? Contact our{" "}
            <a href="/contact" className="text-[#B88E2F] hover:underline">
              customer support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

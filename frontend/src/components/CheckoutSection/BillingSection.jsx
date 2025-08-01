import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import { useCreateOrderMutation } from "../../features/order/orderApi";
import { useClearCartMutation } from "../../features/cart/cartApi";
import { useGetMeQuery } from "../../features/user/userApi";
import { useUpdateProductMutation } from "../../features/product/productApi";

export default function BillingSection() {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.userSlice);
  const { data, refetch } = useGetMeQuery();
  const user = data?.user;
  const [clearCart] = useClearCartMutation();
  const cart = user?.cart;
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    country: "Nepal",
    province: "Western Province",
    additionalInfo: "",
    paymentMethod: "cashOnDelivery",
    paymentStatus: "pending",
    deliveryStatus: "dispatch",
  });

  const paymentStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "failed", label: "Failed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const deliveryStatusOptions = [
    { value: "dispatch", label: "Dispatch" },
    { value: "readyToPickup", label: "Ready to Pickup" },
    { value: "outForDelivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
  ];

  const subtotal = cart?.reduce((acc, item) => {
    const price = item?.product?.discount
      ? (
          item?.product?.price -
          (item?.product?.price * item?.product?.discount) / 100
        ).toFixed(2)
      : item?.product?.price.toFixed(2);
    return acc + price * item.quantity;
  }, 0);
  const total = subtotal.toFixed(2);

  const list = [
    { label: "Company Name (Optional)", type: "text", name: "companyName" },
    { label: "Street address", type: "text", name: "streetAddress" },
    { label: "Town / City", type: "text", name: "city" },
    { label: "ZIP code", type: "number", name: "zipCode" },
    { label: "Phone", type: "number", name: "phone" },
    { label: "Email address", type: "email", name: "email" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const orderData = {
        user: user._id,
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          name: item.product.name,
          price: item.product.price,
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: formData.companyName,
          streetAddress: formData.streetAddress,
          city: formData.city,
          zipCode: formData.zipCode,
          phone: formData.phone,
          email: formData.email,

          country: formData.country,
          province: formData.province,
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: total,
        paymentStatus: formData.paymentStatus,
        deliveryStatus: formData.deliveryStatus,

        additionalInfo: formData.additionalInfo,
      };

      const result = await createOrder(orderData).unwrap();

      for (const item of cart) {
        await updateProduct({
          id: item.product._id, // matches your API param
          formData: {
            stock: item.product.stock - item.quantity, // new stock value
            existingImages: JSON.stringify(
              item.product.images.map((img) => img.url)
            ), // keep images
          },
        }).unwrap();
      }

      await clearCart().unwrap();

      toast.success("Order placed successfully!");

      navigate(`/order-confirmation/${result.order._id}`);
      await refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="my-20 px-4 sm:px-10 md:px-14 lg:px-30">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10">
        Billing details
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <div className="mt-4 flex flex-col sm:flex-row gap-4 max-w-[453px]">
              <div className="w-full">
                <p className="text-base font-medium pb-3">First Name</p>
                <input
                  className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-base font-medium pb-3">Last Name</p>
                <input
                  className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Payment Status Selector (Add this new field) */}
            <div className="max-w-[453px] mt-6">
              <p className="text-base font-medium pb-3">Payment Status</p>
              <select
                className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4 text-base font-normal text-[#9F9F9F]"
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                required
              >
                {paymentStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Status Selector (Add this new field) */}
            <div className="max-w-[453px] mt-6">
              <p className="text-base font-medium pb-3">Delivery Status</p>
              <select
                className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4 text-base font-normal text-[#9F9F9F]"
                name="deliveryStatus"
                value={formData.deliveryStatus}
                onChange={handleChange}
                required
              >
                {deliveryStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {list.map((field, idx) => (
              <div className="max-w-[453px] mt-6" key={idx}>
                <p className="text-base font-medium pb-3">{field.label}</p>
                <input
                  className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4"
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.name !== "companyName"}
                />
              </div>
            ))}

            <div className="max-w-[453px] mt-6">
              <p className="text-base font-medium pb-3">Country / Region</p>
              <select
                className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4 text-base font-normal text-[#9F9F9F]"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option>Nepal</option>
                <option>India</option>
                <option>China</option>
                <option>Sri Lanka</option>
              </select>
            </div>

            <div className="max-w-[453px] mt-6">
              <p className="text-base font-medium pb-3">Province</p>
              <select
                className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4 text-base font-normal text-[#9F9F9F]"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              >
                <option>Western Province</option>
                <option>Eastern Province</option>
                <option>Northern Province</option>
                <option>Southern Province</option>
              </select>
            </div>

            <div className="max-w-[453px] mt-6">
              <p className="text-base font-medium pb-3">Payment Method</p>
              <select
                className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4 text-base font-normal text-[#9F9F9F]"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="cashOnDelivery">Cash on Delivery</option>
                <option value="PayPal">PayPal</option>
                <option value="Mastercard">Mastercard</option>
              </select>
            </div>

            <div className="max-w-[453px] mt-10">
              <input
                placeholder="Additional information"
                className="h-[60px] w-full border border-[#9F9F9F] rounded-[10px] px-4 text-[#9F9F9F]"
                type="text"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Order Summary (Still inside form) */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between text-base font-medium mb-4">
              <h2>Product</h2>
              <h2>Subtotal</h2>
            </div>

            {cart?.map((item) => (
              <div key={item._id} className="flex justify-between mb-2">
                <p>
                  <span className="pr-2 text-[#9F9F9F]">
                    {item?.product?.name}
                  </span>
                  x {item.quantity}
                </p>
                <p className="text-base font-light">
                  $
                  {item?.product?.discount
                    ? (
                        item?.product?.price -
                        (item?.product?.price * item?.product?.discount) / 100
                      ).toFixed(2)
                    : item?.product?.price?.toFixed(2)}
                </p>
              </div>
            ))}

            <div className="flex justify-between my-2">
              <p className="text-base font-normal">Subtotal</p>
              <p className="text-base font-light">${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between my-2">
              <p className="text-base font-normal">Total</p>
              <p className="text-[#B88E2F] font-bold text-2xl">
                ${subtotal.toFixed(2)}
              </p>
            </div>

            <div className="border-b border-[#D9D9D9] my-6" />

            <p className="text-sm md:text-base font-light max-w-full tracking-wide">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className="font-semibold">privacy policy</span>.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`text-lg md:text-xl font-normal px-8 md:px-16 py-3 border rounded-[15px] transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

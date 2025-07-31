import { Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateAddressMutation } from "../../../features/order/orderApi";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

export default function EditAddress({
  setShowEditAddress,
  shippingAddress,
  id,
}) {
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const [firstName, setFirstName] = useState(
    shippingAddress?.firstName || "No Data"
  );
  const [phone, setPhone] = useState(shippingAddress?.phone || "No Data");
  const [lastName, setLastName] = useState(
    shippingAddress?.lastName || "No Data"
  );
  const [province, setProvince] = useState(
    shippingAddress?.province || "No Data"
  );
  const [city, setCity] = useState(shippingAddress?.city || "No Data");
  const [streetAddress, setStreetAddress] = useState(
    shippingAddress?.streetAddress || "No Data"
  );
  const [country, setCountry] = useState(shippingAddress?.country || "No Data");
  const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || "No Data");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAddress({
        id,
        shippingAddress: {
          firstName,
          lastName,
          streetAddress,
          city,
          zipCode,
          country,
          phone,
          province,
        },
      });
      toast.success("Address updated successfully");
      setShowEditAddress(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="  ">
      <div className="  max-w-2xl px-10 py-10 ">
        <div className="text-center">
          <h2 className="text-xl text-[#384551] font-semibold mb-4 ">
            Add New Address
          </h2>
          <p className="text-[#646E78] text-base">
            Add new address for express delivery
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="mt-8 flex flex-col xl:flex-row gap-8 xl:gap-5">
            <div className="flex-1">
              <div className="pb-2">
                {" "}
                <label
                  className="text-base font-regular pb-1 text-[#384551]"
                  htmlFor="first name"
                >
                  First Name
                </label>
              </div>

              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="first name"
                placeholder="John"
                type="text"
                className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
              />
            </div>
            <div className="flex-1">
              <div className="pb-2 ">
                {" "}
                <label
                  className="text-base font-regular pb-1 text-[#384551]"
                  htmlFor="last name"
                >
                  Last Name
                </label>
              </div>

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="last name"
                placeholder="Wick"
                type="text"
                className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
              />
            </div>
          </div>

          <div className="mt-8">
            <p>Country</p>{" "}
            <div className="mt-2">
              <Select
                value={country}
                onChange={(value) => setCountry(value)}
                label=""
                className="!border !border-gray-500 focus:!border-black focus:!ring-0 hover:!border-black rounded-md"
                labelProps={{ className: "hidden" }}
              >
                <Option value="Nepal">Nepal</Option>
                <Option value="India">India</Option>
                <Option value="Sri Lanka">Sri Lanka</Option>
                <Option value="China">China</Option>
              </Select>
            </div>
          </div>
          <div className="mt-8">
            <p>Province</p>{" "}
            <div className="mt-2">
              <Select
                value={province}
                onChange={(value) => setProvince(value)}
                label=""
                className="!border !border-gray-500 focus:!border-black focus:!ring-0 hover:!border-black rounded-md"
                labelProps={{ className: "hidden" }}
              >
                <Option value="Western Province">Western Province</Option>
                <Option value="Eastern Province">Eastern Province</Option>
                <Option value="Northern Province">Northern Province</Option>
                <Option value="Southern Province">Southern Province</Option>
              </Select>
            </div>
          </div>
          <div className="mt-8 flex flex-col xl:flex-row gap-8 xl:gap-5">
            <div className="">
              <label htmlFor="address">Street address</label>

              <input
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                id="address"
                placeholder="eg. Tokha-8"
                type="text"
                className=" border border-[#9F9F9F] w-full py-2 mt-2 rounded-lg px-4"
              />
            </div>
            <div className="">
              <label htmlFor="town">Street address</label>

              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id="town"
                placeholder="Kathmandu"
                type="text"
                className=" border border-[#9F9F9F] w-full py-2 mt-2 rounded-lg px-4"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-8 xl:gap-5">
            <div className="flex-1">
              <label htmlFor="code">Zip code</label>

              <input
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                id="code"
                placeholder="12345"
                type="text"
                className=" border border-[#9F9F9F] w-full py-2 mt-2 rounded-lg px-4"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="phone`">Phone number</label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                placeholder="1234567890"
                type="text"
                className=" border border-[#9F9F9F] w-full py-2 mt-2 rounded-lg px-4"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center items-center gap-5">
            <button
              type="submit"
              className="bg-[#FFAB00] text-white py-2 px-6 rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <Loader className="animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update"
              )}
            </button>
            <button
              onClick={() => setShowEditAddress(false)}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

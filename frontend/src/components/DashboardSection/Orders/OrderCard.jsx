import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/img/avatar.png";
import mastercard from "../../../assets/img/Mastercard.svg";
import paypal from "../../../assets/img/PayPal.png";
import cashOnDelivery from "../../../assets/img/cash-on-delivery.png";
import { useSelector } from "react-redux";

const statusStyles = {
  paid: "text-green-700 ",
  failed: "text-red-700 ",
  pending: "text-yellow-700 ",
  cancelled: "text-gray-700",
};
const statusColor = {
  paid: "bg-green-700 ",
  failed: "bg-red-700 ",
  pending: "bg-yellow-700 ",
  cancelled: "bg-gray-700 ",
};
const status = {
  delivered: "text-[#71DD37] bg-[#71DD37]/10 ",
  outfordelivery: "text-[#696CFF] bg-[#696CFF]/10 ",
  dispatch: "text-[#FFAB00] bg-[#FFAB00]/10 ",
  readytopickup: "text-[#03C3EC]  bg-[#03C3EC]/10 ",
};

export default function OrderCard({
  order,
  setOpen,
  handleOpen,
  setOpenEdit,
  handleDelete,
}) {
  const { user } = useSelector((state) => state.userSlice);
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl space-y-10   gap-y-4 p-4 overflow-x-scroll overflow-y-scroll">
      <h1 className="font-medium text-2xl ">
        Details of {order?.user?.username}
      </h1>
      <div className="grid grid-cols-[130px_1fr] gap-y-4 ">
        <span className="text-[#646E78]  font-medium">Order ID:</span>{" "}
        {order?.orderNumber}
      </div>
      <div className="grid grid-cols-[130px_1fr] gap-y-4">
        <span className="text-[#646E78]  font-medium">Date:</span>{" "}
        {format(new Date(order?.createdAt), "MMM dd, yyyy")}
      </div>
      <div className="grid grid-cols-[130px_1fr] gap-y-4">
        <span className="text-[#646E78]  font-medium">Customers:</span>{" "}
        <span>
          <span className="flex items-center gap-2">
            <img
              src={order?.user?.profilePic?.url || avatar}
              alt=""
              className="w-5 h-5 rounded-full"
            />
            <span className="font-semibold"> {order?.user?.username}</span>
          </span>

          {order?.user?.email}
        </span>
      </div>

      <div className="grid grid-cols-[130px_1fr] gap-y-4">
        <span className="text-[#646E78]  font-medium">Payment:</span>{" "}
        <span
          className={`flex items-center gap-3 text-[15px] ${
            statusStyles[order?.paymentStatus?.toLowerCase()] ||
            "text-gray-700 bg-gray-100"
          }`}
        >
          {" "}
          <div
            className={`w-2 h-2 rounded-full  ${
              statusColor[order?.paymentStatus?.toLowerCase()] || "bg-gray-700 "
            }`}
          />
          {order?.paymentStatus}
        </span>
      </div>
      <div className="grid grid-cols-[130px_1fr] gap-y-4">
        <span className="text-[#646E78]  font-medium">Method:</span>
        <span className="flex items-center gap-2">
          <img
            src={
              order.paymentMethod === "PayPal"
                ? paypal
                : order.paymentMethod === "Mastercard"
                ? mastercard
                : cashOnDelivery
            }
            alt={order.paymentMethod}
            className="w-4 "
          />
          {order?.paymentMethod}
        </span>
      </div>
      <div className="grid grid-cols-[130px_1fr] gap-y-4">
        <span className="text-[#646E78]  font-medium">Action:</span>
        <Menu>
          <MenuHandler>
            <MoreVertical
              onClick={() => setOpenEdit(true)}
              size={20}
              className=" cursor-pointer "
            />
          </MenuHandler>
          <MenuList className="min-w-[120px] absolute left-1/2 -translate-x-1/2">
            <MenuItem
              onClick={() => navigate(`/dashboard/order-details/${order._id}`)}
            >
              View
            </MenuItem>
            <MenuItem onClick={() => handleDelete(order._id)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

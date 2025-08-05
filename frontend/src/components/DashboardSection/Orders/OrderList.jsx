import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Switch,
  Typography,
} from "@material-tailwind/react";
import trentonModularSofa from "../../../assets/img/trenton-modular-sofa1.png";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaBoxOpen, FaCouch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MoreVertical, PlusCircle, X } from "lucide-react";
import { format } from "date-fns";

import { useState } from "react";
import toast from "react-hot-toast";
import mastercard from "../../../assets/img/Mastercard.svg";
import paypal from "../../../assets/img/PayPal.png";
import cashOnDelivery from "../../../assets/img/cash-on-delivery.png";
import avatar from "../../../assets/img/avatar.png";

import OrderCard from "./OrderCard";
import CustomPagination from "../../ShopSection/Pagination";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useGetOrdersByUserQuery,
} from "../../../features/order/orderApi";
import LoadingSpinner from "../../LoadingSpinner";
import { useSelector } from "react-redux";

const TABLE_HEAD = [
  "ORDER",
  "DATE",
  "CUSTOMERS",
  "PAYMENT",
  "STATUS",
  "METHOD",

  "ACTION",
];

const statusStyles = {
  paid: "text-green-700 ",
  failed: "text-red-700 ",
  cancelled: " text-gray-700",
  pending: "text-yellow-700",
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

export default function OrderList() {
  const { user } = useSelector((state) => state.userSlice);
  const isAdmin = user?.role === "admin";
  const { data: adminOrdersData, isLoading: adminLoading } =
    useGetAllOrderQuery();
  const { data: userOrdersData, isLoading: userLoading } =
    useGetOrdersByUserQuery();

  const data = isAdmin ? adminOrdersData : userOrdersData;
  const isLoading = isAdmin ? adminLoading : userLoading;
  const [deleteOrder] = useDeleteOrderMutation();
  const orders = data?.orders;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalProducts = orders?.length;

  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleDelete = async (id) => {
    try {
      await deleteOrder(id).unwrap();
      toast.success("Product deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const totalPages = Math.ceil(orders?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = orders?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalProducts);

  const isEmpty = !orders || orders?.length === 0;

  if (isLoading) return <LoadingSpinner />;

  return (
    <Card className=" w-full  pb-10">
      <div className="flex md:justify-between md:flex-row flex-col px-20 py-10 border border-b border-blue-gray-50">
        <h1 className="text-xl md:text-2xl xl:text-3xl font-medium pb-4 md:pb-0">
          All Orders
        </h1>
      </div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <FaBoxOpen className="w-16 h-16 text-gray-400 mb-4" />
          <Typography variant="h5" className="mb-2 text-gray-700">
            No Orders Found
          </Typography>
          <Typography>
            It looks like you haven't placed any orders yet. When you do,they'll
            appear here.
          </Typography>
          <Button
            color="blue"
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 mt-2"
          >
            <PlusCircle size={18} /> Browse Product
          </Button>
        </div>
      ) : (
        <>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="py-4 px-6">ORDER</th>
                <th className="p-4 hidden md:table-cell">DATE</th>
                <th className="p-4 hidden md:table-cell">CUSTOMERS</th>
                <th className="p-4 hidden sm:table-cell">PAYMENT</th>
                <th className="p-4 hidden xl:table-cell text-center">STATUS</th>
                <th className="p-4 hidden 2xl:table-cell">METHOD</th>
                <th className="p-4 text-center hidden 2xl:table-cell ">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts?.map((item, index) => {
                const isLast = index === orders?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="font-normal flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(item)}
                          className="p-2 rounded-full hover:bg-gray-200 transition"
                        >
                          <PlusCircle className="w-6 h-6 text-gray-700  block 2xl:hidden" />
                        </button>

                        <span className="text-[15px]"> {item.orderNumber}</span>
                      </div>
                    </td>
                    <td className={`${classes} hidden md:table-cell`}>
                      <div className="font-normal flex items-center gap-2">
                        <span className="text-[15px] text-[#646E78]">
                          {format(new Date(item.createdAt), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </td>

                    <td className={`${classes} hidden sm:table-cell`}>
                      <Typography className="font-normal">
                        <span className="flex items-center gap-2">
                          <span className="w-8 h-8 bg-[#FFAB00]/30 rounded-full flex justify-center items-center p-1">
                            <img
                              src={item?.user?.profilePic?.url || avatar}
                              alt=""
                              className="w-full h-full  rounded-full "
                            />
                          </span>
                          <span className="text-[15px] font-medium">
                            {item?.shippingAddress?.firstName}{" "}
                            {item?.shippingAddress?.lastName}
                          </span>
                        </span>
                        <span className="text-[13px] text-[#646E78]">
                          {" "}
                          {item.shippingAddress?.email}
                        </span>
                      </Typography>
                    </td>
                    <td className={`${classes} hidden md:table-cell`}>
                      <div className="font-normal flex items-center gap-2">
                        <span
                          className={`text-[15px] ${
                            statusStyles[item?.paymentStatus?.toLowerCase()] ||
                            "text-gray-700 bg-gray-100"
                          }`}
                        >
                          {item.paymentStatus}
                        </span>
                      </div>
                    </td>

                    <td className={`${classes} hidden xl:table-cell`}>
                      <Typography
                        className={`px-2 py-1 text-[13px] rounded-full text-center font-medium  ${
                          status[item.deliveryStatus?.toLowerCase()]
                        }`}
                      >
                        {item.deliveryStatus}
                      </Typography>
                    </td>
                    <td className={`${classes} hidden 2xl:table-cell`}>
                      <Typography className="font-normal text-center flex items-center gap-2">
                        <span>
                          <img
                            src={
                              item.paymentMethod === "PayPal"
                                ? paypal
                                : item.paymentMethod === "Mastercard"
                                ? mastercard
                                : cashOnDelivery
                            }
                            alt={item.paymentMethod}
                            className="w-4 "
                          />
                        </span>
                        <span className="text-[15px] text-[#646E78]">
                          {item.paymentMethod}
                        </span>
                      </Typography>
                    </td>

                    <td className={`${classes} hidden 2xl:table-cell`}>
                      <div
                        as="a"
                        href="#"
                        className="font-medium flex justify-center gap-2 relative"
                      >
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
                              onClick={() =>
                                navigate(`/dashboard/order-details/${item._id}`)
                              }
                            >
                              View
                            </MenuItem>
                            <MenuItem onClick={() => handleDelete(item._id)}>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {selectedOrder && (
            <div
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-xs px-4"
            >
              <div className=" bg-white max-w-xl w-full shadow-lg rounded-xl p-6 relative">
                <OrderCard
                  order={selectedOrder}
                  setOpen={setOpen}
                  hadleOpen={handleOpen}
                  setOpenEdit={setOpenEdit}
                  handleDelete={handleDelete}
                />
                <div
                  onClick={() => setSelectedOrder(null)}
                  className="absolute top-5 right-5 cursor-pointer"
                >
                  <X />
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mt-6 px-5">
            <p className="text-[#A7ACB2] text-xs sm:text-base">
              Showing {start} to {end} of {totalProducts} entries
            </p>
            <CustomPagination
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </Card>
  );
}

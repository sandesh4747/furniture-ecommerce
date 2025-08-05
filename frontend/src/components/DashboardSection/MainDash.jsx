import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Armchair,
  Star,
  PlusCircle,
  MoreVertical,
  X,
} from "lucide-react";

// import trentonModularSofa from "../../assets/img/trenton-modular-sofa1.png";
import paypal from "../../assets/img/PayPal.png";
import mastercard from "../../assets/img/Mastercard.svg";
import cashOnDelivery from "../../assets/img/cash-on-delivery.png";
import avatar from "../../assets/img/avatar.png";
import toast from "react-hot-toast";
import CustomPagination from "../ShopSection/Pagination";
import OrderCard from "./Orders/OrderCard";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useGetOrdersByUserQuery,
} from "../../features/order/orderApi";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  useGetAllProductQuery,
  useRelevantProductQuery,
} from "../../features/product/productApi";

import { useGetAllUsersQuery } from "../../features/user/userApi";

import { useSelector } from "react-redux";
import RecommendedProducts from "./RecommendedProducts";
import { FaBoxOpen } from "react-icons/fa";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 6000 },
];

const productData = [
  { name: "Office Chairs", value: 400 },
  { name: "Gaming Chairs", value: 300 },
  { name: "Dining Chairs", value: 200 },
  { name: "Stools", value: 100 },
];

const topProducts = [
  { name: "Ergo Pro Chair", rating: 4.8, sales: 120 },
  { name: "Gaming Beast X", rating: 4.6, sales: 95 },
  { name: "Dining Classic", rating: 4.5, sales: 80 },
];

const COLORS = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"];

const statusStyles = {
  paid: "text-green-700",
  failed: "text-red-700",
  cancelled: "text-gray-700",
  pending: "text-yellow-700",
};

const statusColor = {
  paid: "bg-green-700",
  failed: "bg-red-700",
  pending: "bg-yellow-700",
  cancelled: "bg-gray-700",
};

const status = {
  delivered: "text-[#71DD37] bg-[#71DD37]/10",
  outfordelivery: "text-[#696CFF] bg-[#696CFF]/10",
  dispatch: "text-[#FFAB00] bg-[#FFAB00]/10",
  readytopickup: "text-[#03C3EC] bg-[#03C3EC]/10",
};

export default function MainDash() {
  const { user } = useSelector((state) => state.userSlice);
  const isAdmin = user?.role === "admin";

  const { data: adminOrdersData, isLoading: adminLoading } =
    useGetAllOrderQuery();
  const { data: userOrdersData, isLoading: userLoading } =
    useGetOrdersByUserQuery();
  const data = isAdmin ? adminOrdersData : userOrdersData;
  const isLoading = isAdmin ? adminLoading : userLoading;
  const { data: products } = useGetAllProductQuery();
  const { data: users } = useGetAllUsersQuery();

  const { data: relevantProduct } = useRelevantProductQuery();

  const recommendedProducts = relevantProduct?.products?.slice(0, 4);

  const [deleteOrder] = useDeleteOrderMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const totalProducts = 32;
  const [openEdit, setOpenEdit] = useState(false);
  const orders = data?.orders?.slice(0, 10);

  const totalSales = orders
    ?.reduce((total, order) => total + order.totalAmount, 0)
    .toFixed(2);

  const totalUsers = users?.user?.length;
  const AllProducts = products?.product?.length;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders?.length / itemsPerPage);

  const handleOpen = () => setOpen(!open);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders?.slice(startIndex, startIndex + itemsPerPage);
  const start = startIndex + 1;
  const end = Math.min(startIndex + itemsPerPage, orders?.length);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id).unwrap();
      toast.success("Product deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="  w-full">
      <h1 className="text-xl md:text-2xl xl:text-3xl font-medium pb-4 pt-4 text-gray-800  pl-15 xl:pl-0">
        Analytics Dashboard
      </h1>
      {user?.role === "admin" ? (
        <div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 rounded-2xl shadow-md bg-white">
              <div className="flex items-center gap-4">
                <DollarSign className="text-green-500 w-8 h-8" />
                <div>
                  <h2 className="text-gray-600">Total Sales</h2>
                  <p className="text-2xl font-bold text-gray-800">
                    ${totalSales}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-2xl shadow-md bg-white">
              <div className="flex items-center gap-4">
                <ShoppingCart className="text-blue-500 w-8 h-8" />
                <div>
                  <h2 className="text-gray-600">Orders</h2>
                  <p className="text-2xl font-bold text-gray-800">
                    {orders?.length}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-2xl shadow-md bg-white">
              <div className="flex items-center gap-4">
                <Users className="text-purple-500 w-8 h-8" />
                <div>
                  <h2 className="text-gray-600">Customers</h2>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalUsers}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-2xl shadow-md bg-white">
              <div className="flex items-center gap-4">
                <Armchair className="text-yellow-500 w-8 h-8" />
                <div>
                  <h2 className="text-gray-600">Products</h2>
                  <p className="text-2xl font-bold text-gray-800">
                    {AllProducts}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 overflow-x-scroll ">
            <div className="min-w-[300px]">
              <Card className="p-6 rounded-2xl shadow-md bg-white">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Monthly Sales
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4f46e5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="min-w-[300px]">
              <Card className="p-6 rounded-2xl shadow-md bg-white">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Product Category Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {productData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 rounded-2xl shadow-md bg-white">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Top Performing Products
              </h3>
              <ul className="space-y-4">
                {topProducts.map((product, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Star className="text-yellow-500 w-5 h-5" />
                      <span className="text-gray-800 font-medium">
                        {product.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      ⭐ {product.rating} • {product.sales} sales
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 rounded-2xl shadow-md bg-white">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Sales Growth Bar Chart
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-center gap-4">
              <ShoppingCart className="text-blue-500 w-8 h-8" />
              <div>
                <h2 className="text-gray-600">My Orders</h2>
                <p className="text-2xl font-bold text-gray-800">
                  {orders?.length || 0}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-center gap-4">
              <DollarSign className="text-green-500 w-8 h-8" />
              <div>
                <h2 className="text-gray-600">Total Spent</h2>
                <p className="text-2xl font-bold text-gray-800">
                  $
                  {orders
                    ?.reduce((total, order) => total + order.totalAmount, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-center gap-4">
              <Armchair className="text-yellow-500 w-8 h-8" />
              <div>
                <h2 className="text-gray-600">Pending Deliveries</h2>
                <p className="text-2xl font-bold text-gray-800">
                  {orders?.filter((o) => o.deliveryStatus !== "Delivered")
                    .length || 0}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-center gap-4">
              <Star className="text-purple-500 w-8 h-8" />
              <div>
                <h2 className="text-gray-600">Last Order</h2>
                <p className="text-2xl font-bold text-gray-800">
                  {orders?.[0]
                    ? format(new Date(orders[0].createdAt), "MMM dd")
                    : "-"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Orders Table */}
      <Card className="w-full p-6 rounded-2xl shadow-md bg-white">
        <Typography variant="h5" className="mb-4">
          Recent Orders
        </Typography>
        {paginatedOrders?.length > 0 ? (
          <table className="w-full text-left border-collapse min-w-max">
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
              {paginatedOrders?.map((item, index) => {
                const isLast = index === paginatedOrders?.length - 1;
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
                          <span className="w-8 h-8 bg-[#FFAB00]/30 rounded-full flex justify-center items-center">
                            <img
                              src={item?.user?.profilePic?.url || avatar}
                              alt=""
                              className="w-full h-full  rounded-full "
                            />
                          </span>
                          <span className="text-[15px] font-medium">
                            {" "}
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
                          className={`w-2 h-2 rounded-full  ${
                            statusColor[item?.paymentStatus?.toLowerCase()] ||
                            "bg-gray-700 "
                          }`}
                        />
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
                        className={`px-2 py-1 text-[13px] rounded-full text-center font-medium   ${
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <FaBoxOpen className="w-16 h-16 text-gray-400 mb-4" />
            <Typography variant="h5" className="mb-2 text-gray-700">
              No Orders Found
            </Typography>
            <Typography>
              It looks like you haven't placed any orders yet. When you
              do,they'll appear here.
            </Typography>
            <Button
              color="blue"
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 mt-2"
            >
              <PlusCircle size={18} /> Browse Product
            </Button>
          </div>
        )}{" "}
        {/* Pagination */}
        {paginatedOrders?.length > 0 && (
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
        )}
      </Card>

      {/* Modal for order details - you can customize this */}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-xs px-4 z-60"
        >
          <div className=" bg-white max-w-xl w-full shadow-lg rounded-xl p-6 relative z-55">
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
      {user?.role !== "admin" && (
        <Card className="p-4 rounded-2xl shadow-md bg-white mt-14">
          <RecommendedProducts />
        </Card>
      )}
    </div>
  );
}

import React, { useState } from "react";
import {
  Step,
  Card,
  Button,
  Stepper,
  CardBody,
  CardHeader,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  PencilIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  TruckIcon,
  GiftIcon,
} from "@heroicons/react/24/solid";
import EditAddress from "./EditAddress";
import { X } from "lucide-react";

import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../../features/order/orderApi";
import { addDays, format } from "date-fns";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function OrderDetails() {
  const { id } = useParams();

  const { data } = useGetSingleOrderQuery(id);
  const order = data?.order;

  const products = order?.items;
  // console.log(products);
  const shippingAddress = order?.shippingAddress;

  const [showEditaddress, setShowEditAddress] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Order #${order?.orderNumber}`, 105, 30, { align: "center" });

    doc.text(
      `Date: ${format(new Date(order?.createdAt), "MMM dd, yyyy")}`,
      14,
      45
    );
    doc.text(
      `Customer: ${shippingAddress?.firstName} ${shippingAddress?.lastName}`,
      14,
      55
    );

    doc.text("Shipping Address:", 14, 70);
    doc.text(`${shippingAddress?.streetAddress}`, 14, 80);
    doc.text(`${shippingAddress?.city}, ${shippingAddress?.province}`, 14, 90);
    doc.text(
      `${shippingAddress?.country} ${shippingAddress?.zipCode}`,
      14,
      100
    );

    // Helper: Calculate price with discount
    const calculateDiscountedPrice = (product) => {
      const discount = product?.product?.discount || 0;
      const originalPrice = product?.price || 0;
      return originalPrice - (originalPrice * discount) / 100;
    };

    const productRows = products?.map((item) => {
      const discountedPrice = calculateDiscountedPrice(item);
      return [
        item.name,
        item.quantity,
        `$${discountedPrice.toFixed(2)}`,
        `$${(discountedPrice * item.quantity).toFixed(2)}`,
      ];
    });

    autoTable(doc, {
      startY: 120,
      head: [["Product", "Quantity", "Price", "Total"]],
      body: productRows,
    });

    // Recalculate discounted subtotal
    const discountedSubtotal = products?.reduce((acc, item) => {
      const discountedPrice = calculateDiscountedPrice(item);
      return acc + discountedPrice * item.quantity;
    }, 0);

    const finalY = doc.lastAutoTable.finalY + 20;
    doc.text(`Subtotal: $${discountedSubtotal.toFixed(2)}`, 140, finalY);
    doc.text(`Shipping: $10.00`, 140, finalY + 10);
    doc.text(`Tax: $5.00`, 140, finalY + 20);
    doc.text(
      `Total: $${(discountedSubtotal + 10 + 5).toFixed(2)}`,
      140,
      finalY + 30
    );

    doc.save(`invoice_${order?.orderNumber}.pdf`);
  };

  return (
    <section className="container mx-auto py-10 px-4 ">
      <div className="mb-5 pl-20 ">
        <Typography variant="h4" className="font-bold text-gray-900  ">
          Order Details
        </Typography>
        <Typography className="text-gray-600">
          Order placed on{" "}
          <span className="font-medium">
            {" "}
            {order?.createdAt
              ? format(new Date(order.createdAt), "MMM dd, yyyy")
              : "N/A"}
          </span>
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Summary Card */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <Typography className="font-semibold text-gray-900">
                    Date Ordered
                  </Typography>
                  <Typography className="text-gray-600">
                    {order?.createdAt
                      ? format(new Date(order.createdAt), "MMM dd, yyyy")
                      : "N/A"}
                  </Typography>
                </div>
                <div className="space-y-1">
                  <Typography className="font-semibold text-gray-900">
                    Order Number
                  </Typography>
                  <Typography className="text-gray-600">
                    {" "}
                    {order?.orderNumber}
                  </Typography>
                </div>
                <div className="space-y-1">
                  <Typography className="font-semibold text-gray-900">
                    Total Amount
                  </Typography>
                  <Typography className="text-gray-900 font-bold">
                    ${order?.totalAmount}
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Order Progress Card */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader
              shadow={false}
              floated={false}
              className="p-6 border-b border-gray-200 bg-gray-50"
            >
              <Typography variant="h5" className="font-semibold text-gray-900">
                Order Status
              </Typography>
            </CardHeader>
            <CardBody className="p-6 ">
              <div className="relative overflow-x-auto pb-12 pl-5">
                <Stepper
                  activeStep={activeStep}
                  lineClassName="bg-gray-200"
                  activeLineClassName="bg-blue-500"
                  className="w-full min-w-[600px] md:min-w-full"
                >
                  <Step
                    className="h-8 w-8"
                    activeClassName="bg-blue-500 text-white"
                    completedClassName="bg-blue-500 text-white"
                    onClick={() => setActiveStep(0)}
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                    <div className="absolute -bottom-10 w-max text-center">
                      <Typography
                        variant="small"
                        className="font-semibold text-gray-900 "
                      >
                        Ordered
                      </Typography>
                      <Typography className="text-xs text-gray-600">
                        {order?.createdAt
                          ? format(new Date(order.createdAt), "MMM dd, yyyy")
                          : "N/A"}
                      </Typography>
                    </div>
                  </Step>
                  <Step
                    className="h-8 w-8 border border-gray-300"
                    activeClassName="bg-blue-500 text-white border-blue-500"
                    completedClassName="bg-blue-500 text-white border-blue-500"
                    onClick={() => setActiveStep(1)}
                  >
                    <TruckIcon className="h-5 w-5" />
                    <div className="absolute -bottom-10 w-max text-center">
                      <Typography
                        variant="small"
                        className="font-semibold text-gray-900"
                      >
                        Shipped
                      </Typography>
                      <Typography className="text-xs text-gray-600">
                        <span>
                          {order?.createdAt
                            ? format(
                                addDays(new Date(order.createdAt), 4),
                                "MMM dd, yyyy"
                              ) // ← +4 days
                            : "N/A"}
                        </span>
                      </Typography>
                    </div>
                  </Step>
                  <Step
                    className="h-8 w-8 border border-gray-300"
                    activeClassName="bg-blue-500 text-white border-blue-500"
                    completedClassName="bg-blue-500 text-white border-blue-500"
                    onClick={() => setActiveStep(2)}
                  >
                    <GiftIcon className="h-5 w-5" />
                    <div className="absolute -bottom-10 w-max text-center">
                      <Typography
                        variant="small"
                        className="font-semibold text-gray-900"
                      >
                        Delivered
                      </Typography>
                      <Typography className="text-xs text-gray-600">
                        {order?.createdAt
                          ? format(
                              addDays(new Date(order.createdAt), 5),
                              "MMM dd, yyyy"
                            )
                          : "N/A"}
                      </Typography>
                    </div>
                  </Step>
                </Stepper>
              </div>
            </CardBody>
          </Card>

          {/* Products Card */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader
              shadow={false}
              floated={false}
              className="p-6 border-b border-gray-200 bg-gray-50"
            >
              <Typography variant="h5" className="font-semibold text-gray-900">
                Products
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-8">
                {products?.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <img
                      src={product?.product?.images[0]?.url}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      alt={product?.name}
                    />
                    <div className="flex-1">
                      <Typography
                        variant="h6"
                        className="font-semibold text-gray-900"
                      >
                        {product?.name}
                      </Typography>

                      <Typography className="text-gray-600 mt-1">
                        size: M
                      </Typography>
                      <Typography className="text-gray-600 mt-1">
                        Quantity: {product?.quantity}
                      </Typography>
                      <Typography className="text-gray-900 font-medium mt-2">
                        SubTotal: $
                        {product?.product?.discount
                          ? (
                              product?.product?.price -
                              (product?.product?.price *
                                product?.product?.discount) /
                                100
                            ).toFixed(2) * product?.quantity.toFixed(2)
                          : (product?.price * product?.quantity).toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Summary Card */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader
              shadow={false}
              floated={false}
              className="p-6 border-b border-gray-200 bg-gray-50"
            >
              <Typography variant="h5" className="font-semibold text-gray-900">
                Order Summary
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Typography className="text-gray-600">SubTotal</Typography>
                  <Typography className="text-gray-900">
                    {order?.totalAmount}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-gray-600">
                    Shipping estimate
                  </Typography>
                  <Typography className="text-gray-900">$10</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-gray-600">
                    {" "}
                    Tax estimate
                  </Typography>
                  <Typography className="text-gray-900">$5</Typography>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <Typography className="font-semibold text-gray-900">
                      Order Total
                    </Typography>
                    <Typography className="font-bold text-gray-900">
                      ${order?.totalAmount + 15}
                    </Typography>
                  </div>
                </div>
              </div>
              <Button
                variant="outlined"
                color="blue-gray"
                className="mt-6 flex items-center gap-2 w-full justify-center"
                onClick={generateInvoice}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Download Invoice
              </Button>
            </CardBody>
          </Card>

          {/* Shipping Address Card */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader
              shadow={false}
              floated={false}
              className="p-6 border-b border-gray-200 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-900"
                >
                  Shipping Address
                </Typography>
                <IconButton
                  onClick={() => setShowEditAddress(true)}
                  size="sm"
                  variant="text"
                  color="blue-gray"
                  className="rounded-full"
                >
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-2">
                <Typography className="text-gray-900 font-medium">
                  {shippingAddress?.firstName} {shippingAddress?.lastName}
                </Typography>
                <Typography className="text-gray-600">
                  {shippingAddress?.streetAddress}
                </Typography>

                <Typography className="text-gray-600">
                  {shippingAddress?.city}
                </Typography>
                <Typography className="text-gray-600">
                  {shippingAddress?.country}
                </Typography>
                <Typography className="text-gray-600">
                  {shippingAddress?.province}
                </Typography>
                <Typography className="text-gray-600">
                  {shippingAddress?.zipCode}
                </Typography>
                <Typography className="text-gray-600">
                  {shippingAddress?.phone}
                </Typography>
              </div>
            </CardBody>

            {showEditaddress && (
              <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <div className="relative bg-white max-h-[90vh] overflow-y-auto w-full max-w-2xl rounded-lg">
                  <EditAddress
                    id={id}
                    setShowEditAddress={setShowEditAddress}
                    shippingAddress={shippingAddress}
                  />

                  <div
                    onClick={() => setShowEditAddress(null)}
                    className="absolute top-4 right-4 cursor-pointer"
                  >
                    <X />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Billing Card */}
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardHeader
              shadow={false}
              floated={false}
              className="p-6 border-b border-gray-200 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-900"
                >
                  Billing Information
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <Typography className="text-gray-600">
                Same as shipping address
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

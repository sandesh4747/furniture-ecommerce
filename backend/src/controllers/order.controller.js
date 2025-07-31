import { orderSchema } from "../middleware/validator.js";
import { Order } from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "username email profilePic")
      .populate("items.product", "name price images discount  stock")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("Error in getOrders controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name price images discount stock");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log("Error in getOrderById controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    // Validate and destructure the request body
    const {
      user,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus,
      deliveryStatus,
    } = await orderSchema.validateAsync(req.body, { abortEarly: false });

    // Check if items array is empty
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Generate order number
    const orderNumber = `#${Date.now()}`;
    // Create new order
    const newOrder = new Order({
      orderNumber,
      user,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        ...(item.image && { image: item.image }), // Only include image if it exists
      })),
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        streetAddress: shippingAddress.streetAddress,
        city: shippingAddress.city,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
        phone: shippingAddress.phone,
        province: shippingAddress.province,
        email: shippingAddress.email,
        companyName: shippingAddress.companyName || "",
      },
      paymentMethod,
      totalAmount,
      paymentStatus: paymentStatus || "pending", // Default status
      deliveryStatus: deliveryStatus || "dispatch", // Default status
    });

    // Save the order
    await newOrder.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    if (error.isJoi)
      return res.status(400).json({ message: error.details[0].message });

    // Handle other errors
    console.error("Error in createOrder controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, deliveryStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log("Error in updateOrderStatus controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.log("Error in deleteOrder controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { shippingAddress } = req.body;
    const {
      firstName,
      lastName,
      streetAddress,
      city,
      zipCode,
      country,
      phone,
      province,
      email,
      companyName,
    } = shippingAddress || {};

    // Find the order by ID
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update shipping address fields
    order.shippingAddress = {
      firstName: firstName || order.shippingAddress.firstName,
      lastName: lastName || order.shippingAddress.lastName,
      streetAddress: streetAddress || order.shippingAddress.streetAddress,
      city: city || order.shippingAddress.city,
      zipCode: zipCode || order.shippingAddress.zipCode,
      country: country || order.shippingAddress.country,
      phone: phone || order.shippingAddress.phone,
      province: province || order.shippingAddress.province,
      email: email || order.shippingAddress.email,
      companyName: companyName || order.shippingAddress.companyName || "",
    };

    // Save the updated order
    await order.save();

    res.status(200).json({
      success: true,
      message: "Shipping address updated successfully",
      order,
    });
  } catch (error) {
    console.log("Error in updateAddress controller", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      streetAddress: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      zipCode: {
        type: Number,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        enum: ["Nepal", "India", "China", "Sri Lanka"],
        required: true,
      },
      phone: {
        type: Number,
        required: true,
        trim: true,
      },
      companyName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      province: {
        type: String,
        enum: [
          "Eastern Province",
          "Northern Province",
          "Southern Province",
          "Western Province",
        ],
        required: true,
      },
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },
    deliveryStatus: {
      type: String,
      enum: ["dispatch", "readyToPickup", "outForDelivery", "delivered"],
      default: "dispatch",
    },
    paymentMethod: {
      type: String,
      enum: ["cashOnDelivery", "PayPal", "Mastercard"],
      default: "cashOnDelivery",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

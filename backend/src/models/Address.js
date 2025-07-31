import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    zipCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      enum: ["Nepal", "India", "China", "Sri Lanka"],
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    companyName: {
      type: String,
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
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);

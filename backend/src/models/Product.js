import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },

    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Please enter product price"],
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    category: {
      type: String,
      required: [true, "Please enter product category"],
    },

    status: {
      type: String,
      enum: ["Published", "Scheduled", "Inactive"],
      default: "Published",
    },
    inStock: {
      type: Boolean,

      default: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sku: {
      type: String,
      unique: true,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);

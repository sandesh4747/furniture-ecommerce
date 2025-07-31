import { cloudinary } from "../lib/cloudinary.js";
import { productSchema } from "../middleware/validator.js";
import { Product } from "../models/Product.js";

export const getAllProduct = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const product = await Product.find(query).populate("reviews").sort({
      createdAt: -1,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error in getAllProduct controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  if (req.body.tags && typeof req.body.tags === "string") {
    try {
      req.body.tags = JSON.parse(req.body.tags);
    } catch (error) {
      return res.status(400).json({ message: "Invalid tags format" });
    }
  }
  try {
    const {
      name,
      description,
      isFeatured,
      price,
      sku,
      category,
      inStock,
      status,
      discount,
      tags,
      stock,
    } = await productSchema.validateAsync(req.body, { abortEarly: false });

    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU must be unique" });
    }
    if (!req.files || req.files.length === 0)
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });

    const images =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];
    const product = await Product.create({
      name,
      description,
      price,
      tags,
      category,
      inStock,
      isFeatured,
      status,
      discount,
      sku,
      images,

      stock,
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log("Error in createProduct controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // .populate("reviews");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error in getSingleProduct controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateData = { ...req.body };

    // Parse existing images from frontend

    const existingImages = JSON.parse(req.body.existingImages || "[]");

    //Delete only the images that are not in presercedImages

    const imagesToDelete = product.images.filter(
      (img) => !existingImages.includes(img.url)
    );

    for (const img of imagesToDelete) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // New uploaded images
    const newUploadedImages =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    //Combine preserved + new images
    const finalImages = [
      ...product.images.filter((img) => existingImages.includes(img.url)),
      ...newUploadedImages,
    ];
    updateData.images = finalImages;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.log("Error in updateProduct controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }
    await product.deleteOne();

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleInStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.inStock = !product.inStock;
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error in toggleInStock controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error in toggleFeaturedProduct function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getLatestProducts controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getHighPricedProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ price: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getLatestProducts controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getLowPricedProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ price: 1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getLatestProducts controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRelevantProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "Published",
      inStock: true,
    }).sort({ isFeatured: -1, avgRating: -1, createdAt: -1 });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getRelevantProducts controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "Published",
      inStock: true,
      isFeatured: true,
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getRelevantProducts controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: productId }, // exclude current product
      category: product.category,
      status: "Published",
      inStock: true,
    })
      .sort({ isFeatured: -1, createdAt: -1 }) // optional sorting
      .limit(6); // limit to 6 related items

    res.status(200).json({ success: true, products: relatedProducts });
  } catch (error) {
    console.error("Error in getRelatedProducts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

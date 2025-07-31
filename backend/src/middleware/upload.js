import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../lib/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce",
    allowedFormats: ["jpg", "png", "jpeg", "webp"],
  },
  transformation: {
    width: 1000,
    height: 1000,
    crop: "limit",
  },
});

export const upload = multer({ storage });

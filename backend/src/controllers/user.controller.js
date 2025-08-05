import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in getMe controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "favourites",
        select: "images name price discount ",
      })
      .populate({
        path: "cart.product",
        select: "name price images discount stock",
      })
      .populate("orders");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in getMe controller", error);
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { username, email, status } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) user.username = username;
    if (email) user.email = email;

    if (status) user.status = status;
    await user.save();
    res.status(200).json({ success: true, user, password: undefined });
  } catch (error) {
    console.log("Error in updateProfile controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (req.file)
      user.profilePic = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    await user.save();

    res.status(200).json({ success: true, user, password: undefined });
  } catch (error) {
    console.log("Error in updateProfilePic controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleFavouriteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);

    const isFavourite = user.favourites.includes(productId);

    if (isFavourite) {
      user.favourites.pull(productId);
    } else {
      user.favourites.push(productId);
    }

    await user.save();
    const populatedUser = await User.findById(userId).populate("favourites");
    console.log(populatedUser);

    res.status(200).json({
      success: true,
      message: isFavourite ? "Removed from favourites" : "Added to favourites",
      favourites: populatedUser.favourites,
    });
  } catch (error) {
    console.error("Error in toggleFavouriteProduct controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

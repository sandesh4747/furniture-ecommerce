import { User } from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user._id);
    const existingItem = user.cart.find(
      (item) => item.product?.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in addToCart controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const getCart = async (req, res) => {};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user._id);
    const item = user.cart.find((item) => item._id?.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    item.quantity = quantity;
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in updateCartItem controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    const updatedCart = user.cart.filter(
      (item) => item?._id.toString() !== productId
    );

    user.cart = updatedCart;
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in removeFromCart controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res
      .status(200)
      .json({ success: true, cart: user.cart, message: "Cart cleared" });
  } catch (error) {
    console.log("Error in clearCart controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

import { Address } from "../models/Address.js";
import { User } from "../models/User.js";

export const createAddress = async (req, res) => {
  try {
    const address = await Address.create({ ...req.body, user: req.user._id });
    if (!address)
      return res.status(400).json({ message: "Error in creating address" });

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { addresses: address._id },
      },
      { new: true }
    );

    /*const user = await User.findById(req.user._id)
    if(!user) return res.status(404).json({message:"User not found"});
    user.addresses.push(address._id);
     await user.save();
 */

    res.status(201).json({ success: true, address });
  } catch (error) {
    console.log("Error in createAddress controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.log("Error in getUserAddress controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!address) return res.status(404).json({ message: "Address not found" });
    res.status(200).json({ success: true, address });
  } catch (error) {
    console.log("Error in updateAddress controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
import { loginSchema, registerSchema } from "../middleware/validator.js";
import { User } from "../models/User.js";

// Signup
export const signup = async (req, res) => {
  try {
    const { username, email, password, contact, country } =
      await registerSchema.validateAsync(req.body, { abortEarly: false });

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      email,
      username,
      password,
      contact,
      country,
    });

    generateTokenAndSetCookie(res, user._id);

    res
      .status(201)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    if (error.isJoi)
      return res.status(400).json({ message: error.details[0].message });
    console.log("Error in signup controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    if (!email) return res.status(400).json({ message: "email is required" });

    if (!password)
      return res.status(400).json({ message: "password is required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isPasswordCorrect = await user.comparedPassword(password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    generateTokenAndSetCookie(res, user._id);

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    if (error.isJoi)
      return res.status(400).json({ message: error.details[0].message });
    console.log("Error in login controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed" });
  } catch (error) {
    console.log("Error in changePassword controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

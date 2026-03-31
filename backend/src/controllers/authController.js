import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(StatusCodes.CONFLICT).json({ message: "Email already in use" });
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user);

  return res.status(StatusCodes.CREATED).json({
    message: "Registration successful",
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);
  return res.status(StatusCodes.OK).json({
    message: "Login successful",
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.status(StatusCodes.OK).json(user);
};

import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";

export const getAllUsers = async (_req, res) => {
  const users = await User.find().select("-password");
  return res.status(StatusCodes.OK).json(users);
};

export const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
  }
  return res.status(StatusCodes.OK).json({ message: "User deleted" });
};

export const getPlatformStats = async (_req, res) => {
  const [usersCount, coursesCount, avgProgressResult] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Progress.aggregate([{ $group: { _id: null, avg: { $avg: "$percentage" } } }])
  ]);

  return res.status(StatusCodes.OK).json({
    usersCount,
    coursesCount,
    avgProgress: avgProgressResult[0]?.avg || 0
  });
};

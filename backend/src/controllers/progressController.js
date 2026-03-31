import { StatusCodes } from "http-status-codes";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";

export const updateProgress = async (req, res) => {
  const { courseId, percentage } = req.body;
  const enrollment = await Enrollment.findOne({ userId: req.user._id, courseId });

  if (!enrollment) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Not enrolled in this course" });
  }

  const progress = await Progress.findOneAndUpdate(
    { userId: req.user._id, courseId },
    { percentage },
    { new: true, upsert: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json(progress);
};

export const getMyProgress = async (req, res) => {
  const progress = await Progress.find({ userId: req.user._id }).populate("courseId");
  return res.status(StatusCodes.OK).json(progress);
};

export const getCourseProgress = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
  }

  const progress = await Progress.find({ courseId }).populate("userId", "name email");
  return res.status(StatusCodes.OK).json(progress);
};

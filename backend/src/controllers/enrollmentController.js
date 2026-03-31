import { StatusCodes } from "http-status-codes";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import { sendNotification } from "../services/socket.js";

export const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
  }

  const paymentStatus = course.price > 0 ? "pending" : "free";
  const enrollment = await Enrollment.findOneAndUpdate(
    { userId: req.user._id, courseId },
    { userId: req.user._id, courseId, paymentStatus },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await Progress.findOneAndUpdate(
    { userId: req.user._id, courseId },
    { userId: req.user._id, courseId, percentage: 0 },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await sendNotification(req.user._id, `Enrolled in course: ${course.title}`);
  return res.status(StatusCodes.CREATED).json(enrollment);
};

export const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ userId: req.user._id }).populate("courseId");
  return res.status(StatusCodes.OK).json(enrollments);
};

import { StatusCodes } from "http-status-codes";
import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  const course = await Course.create({
    ...req.body,
    createdBy: req.user._id
  });
  return res.status(StatusCodes.CREATED).json(course);
};

export const getCourses = async (_req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  return res.status(StatusCodes.OK).json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
  }
  return res.status(StatusCodes.OK).json(course);
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
  }
  return res.status(StatusCodes.OK).json({ message: "Course deleted" });
};

import { StatusCodes } from "http-status-codes";
import openai from "../config/openai.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";

export const chatbot = async (req, res) => {
  const { message } = req.body;
  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    input: `You are a helpful course assistant. User message: ${message}`
  });

  return res.status(StatusCodes.OK).json({
    reply: response.output_text
  });
};

export const recommendations = async (req, res) => {
  const enrollments = await Enrollment.find({ userId: req.user._id }).populate("courseId");
  const progress = await Progress.find({ userId: req.user._id });
  const allCourses = await Course.find();

  const prompt = `
User enrolled courses: ${enrollments.map((e) => e.courseId?.title).join(", ")}
User progress: ${progress.map((p) => `${p.courseId}:${p.percentage}%`).join(", ")}
Available courses: ${allCourses.map((c) => `${c._id}:${c.title}`).join(", ")}
Return a JSON array with up to 3 recommended course IDs only.
`;

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    input: prompt
  });

  let ids = [];
  try {
    ids = JSON.parse(response.output_text);
  } catch (_e) {
    ids = [];
  }

  const recommended = await Course.find({ _id: { $in: ids } });
  return res.status(StatusCodes.OK).json(recommended);
};

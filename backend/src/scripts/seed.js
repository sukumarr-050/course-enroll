import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Enrollment.deleteMany({}),
    Progress.deleteMany({})
  ]);

  const admin = await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin@123",
    role: "admin"
  });

  const user = await User.create({
    name: "John Learner",
    email: "john@example.com",
    password: "User@123",
    role: "user"
  });

  const courses = await Course.insertMany([
    {
      title: "React for Beginners",
      description: "Learn React fundamentals and component architecture.",
      videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      price: 29,
      createdBy: admin._id
    },
    {
      title: "Node.js API Masterclass",
      description: "Build secure and scalable REST APIs with Node and Express.",
      videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
      price: 0,
      createdBy: admin._id
    }
  ]);

  await Enrollment.create({
    userId: user._id,
    courseId: courses[1]._id,
    paymentStatus: "free"
  });

  await Progress.create({
    userId: user._id,
    courseId: courses[1]._id,
    percentage: 35
  });

  console.log("Seed data inserted successfully");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});

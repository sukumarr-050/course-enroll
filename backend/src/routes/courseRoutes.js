import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses
} from "../controllers/courseController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", protect, authorize("admin"), createCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

export default router;

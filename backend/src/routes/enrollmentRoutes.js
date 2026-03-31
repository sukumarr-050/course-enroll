import { Router } from "express";
import {
  enrollInCourse,
  getMyEnrollments
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, enrollInCourse);
router.get("/me", protect, getMyEnrollments);

export default router;

import { Router } from "express";
import {
  getCourseProgress,
  getMyProgress,
  updateProgress
} from "../controllers/progressController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", protect, getMyProgress);
router.put("/", protect, updateProgress);
router.get("/course/:id", protect, authorize("admin"), getCourseProgress);

export default router;

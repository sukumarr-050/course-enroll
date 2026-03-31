import { Router } from "express";
import { chatbot, recommendations } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/chatbot", protect, chatbot);
router.get("/recommendations", protect, recommendations);

export default router;

import { Router } from "express";
import { getConversation } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/conversation/:userId", protect, getConversation);

export default router;

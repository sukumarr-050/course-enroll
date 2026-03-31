import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getPlatformStats
} from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect, authorize("admin"));
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/stats", getPlatformStats);

export default router;

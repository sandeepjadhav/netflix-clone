import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  saveProgress,
  resume,
  continueWatching,
} from "./watch.controller.js";

const router = Router();

router.post("/progress", authMiddleware, saveProgress);
router.get("/resume/:movieId", authMiddleware, resume);
router.get("/continue", authMiddleware, continueWatching);

export default router;

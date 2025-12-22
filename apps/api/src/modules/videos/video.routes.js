import { Router } from "express";
import multer from "multer";
import { uploadVideo } from "./video.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("video"),
  uploadVideo
);

export default router;

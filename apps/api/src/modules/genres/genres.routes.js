import { Router } from "express";
import { createGenre, listGenres } from "./genres.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createGenre); // admin later
router.get("/", listGenres);

export default router;

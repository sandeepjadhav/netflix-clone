import { Router } from "express";
import { createMovie, listMovies, getMovie, netflixRows, updateMovie } from "./movies.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createMovie);
router.get("/", listMovies);
router.get("/rows/home", netflixRows);
router.patch("/:id", authMiddleware, updateMovie);
router.get("/:id", getMovie);

export default router;

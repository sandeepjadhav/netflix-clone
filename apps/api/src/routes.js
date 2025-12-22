import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import movieRoutes from "./modules/movies/movies.routes.js";
import genreRoutes from "./modules/genres/genres.routes.js"
import userRoutes from "./modules/users/users.routes.js";
import videoRoutes from "./modules/videos/video.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/genres", genreRoutes);
router.use("/videos", videoRoutes);

export default router;
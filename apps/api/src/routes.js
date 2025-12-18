import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);
import userRoutes from "./modules/users/users.routes.js";
router.use("/users", userRoutes);
export default router;
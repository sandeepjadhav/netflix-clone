import * as authService from "./auth.service.js";
import { signAccessToken } from "../../utils/jwt.js";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db.js";

export const register = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json({ user });
};

export const login = async (req, res) => {
  const tokens = await authService.login(req.body);
  res.json(tokens);
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const payload = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
  );

  const accessToken = signAccessToken({ userId: payload.userId });

  res.json({ accessToken });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  res.json({ message: "Logged out" });
};


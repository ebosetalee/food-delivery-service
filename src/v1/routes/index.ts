import express from "express";
import userRoutes from "./user";
import authRoutes from "./auth";

const router = express.Router();

router.use("", userRoutes);

router.use("", authRoutes);

export default router;

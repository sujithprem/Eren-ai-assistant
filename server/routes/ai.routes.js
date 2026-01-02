import express from "express";
import { askAI } from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔥 THIS LINE IS REQUIRED
router.post("/", authMiddleware, askAI);

export default router;

import express from "express";
import { generateRoadmap } from "../controllers/roadmap.controller.js";

const router = express.Router();

// POST /api/roadmap/generate
router.post("/generate", generateRoadmap);

export default router;

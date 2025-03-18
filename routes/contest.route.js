import express from "express";
import {
  updateContestProgress,
  getContestProgress, getRecentActivity
} from "../controllers/contest.controller.js";

const router = express.Router();

// Post request to update contest progress
router.post("/progress", (req, res, next) => {
  console.log("[DEBUG] Request received at /api/contest/progress");
  next();
}, updateContestProgress);

// Get request to retrieve contest progress
router.get("/progress/:userId", (req, res, next) => {
  console.log("[DEBUG] Request received at /api/contest/progress/:userId");
  next();
}, getContestProgress);

router.get("/recent-activity/:userId", getRecentActivity);  // Add this route

export default router;

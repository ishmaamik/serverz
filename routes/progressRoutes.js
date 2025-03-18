import express from 'express';
import { getProgress, updateProgress, markAsRead } from '../controllers/progressController.js';

const router = express.Router();

// Route to fetch user progress
router.get('/api/progress/get-progress/:userId', getProgress);

// Route to update user progress
router.post('/api/progress/update-progress', updateProgress);

// Route to mark a lesson as read
router.post('/api/progress/mark-as-read', markAsRead);

export default router;

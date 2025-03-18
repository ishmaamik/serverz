import Progress from '../models/progressModel.js';

// Fetch user progress
export const getProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found for this user' });
    }

    return res.status(200).json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update user progress
export const updateProgress = async (req, res) => {
  const { userId, lessonId } = req.body;

  if (!userId || !lessonId) {
    return res.status(400).json({ message: 'User ID and Lesson ID are required' });
  }

  try {
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        completedLessons: [lessonId],
        progress: (1 / 20) * 100, // Assuming 20 lessons
      });
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
      const totalLessons = 20; // Total lessons in the course
      progress.progress = (progress.completedLessons.length / totalLessons) * 100;
    }

    await progress.save();

    return res.status(200).json({ progress, message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Error updating progress:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user progress when marking a lesson as read
export const markAsRead = async (req, res) => {
  const { userId, lessonId } = req.body;

  if (!userId || !lessonId) {
    return res.status(400).json({ message: 'User ID and Lesson ID are required' });
  }

  try {
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        completedLessons: [lessonId],
        progress: (1 / 20) * 100, // Assuming 20 lessons
      });
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
      const totalLessons = 20; // Total lessons in the course
      progress.progress = (progress.completedLessons.length / totalLessons) * 100;
    }

    await progress.save();

    return res.status(200).json({ progress, message: 'Lesson marked as read' });
  } catch (error) {
    console.error('Error updating progress:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// import JProgress from '../models/JProgressModel.js'; // Import the Java progress model

// // Fetch user progress
// export const getJavaProgress = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const progress = await JProgress.findOne({ userId });

//     if (!progress) {
//       return res.status(404).json({ message: 'Progress not found for this user' });
//     }

//     return res.status(200).json({ progress });
//   } catch (error) {
//     console.error("Error fetching progress:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Update user progress
// export const updateJavaProgress = async (req, res) => {
//   const { userId, lessonId } = req.body;

//   if (!userId || !lessonId) {
//     return res.status(400).json({ message: 'User ID and Lesson ID are required' });
//   }

//   try {
//     let progress = await JProgress.findOne({ userId });

//     if (!progress) {
//       progress = new JProgress({
//         userId,
//         completedLessons: [lessonId],
//         progress: (1 / 6) * 100, // Assuming 6 lessons in the Java course
//       });
//     } else {
//       if (!progress.completedLessons.includes(lessonId)) {
//         progress.completedLessons.push(lessonId);
//       }
//       const totalLessons = 6; // Total lessons in the Java course
//       progress.progress = (progress.completedLessons.length / totalLessons) * 100;
//     }

//     await progress.save();

//     return res.status(200).json({ progress, message: 'Progress updated successfully' });
//   } catch (error) {
//     console.error('Error updating progress:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Update user progress when marking a lesson as read
// export const markAsReadJava = async (req, res) => {
//     const { userId, lessonId } = req.body;
  
//     if (!userId || !lessonId) {
//       return res.status(400).json({ message: 'User ID and Lesson ID are required' });
//     }
  
//     console.log("Received request to mark lesson as read:");
//     console.log("User ID:", userId, "Lesson ID:", lessonId); // Debugging the IDs

//     console.log("Received User ID:", userId);
// console.log("Received Lesson ID:", lessonId);

  
//     try {
//       // Find the user's progress in the Java course
//       let progress = await JProgress.findOne({ userId });
  
//       if (!progress) {
//         console.log("No progress found for user, creating new progress record.");
//         progress = new JProgress({
//           userId,
//           completedLessons: [lessonId],
//           progress: (1 / 6) * 100, // Assuming 6 lessons in the Java course
//         });
//       } else {
//         console.log("Progress found for user, updating completed lessons.");
//         if (!progress.completedLessons.includes(lessonId)) {
//           progress.completedLessons.push(lessonId);
//           console.log(`Lesson ${lessonId} added to completed lessons.`);
//         }
//         const totalLessons = 6; // Total lessons in the Java course
//         progress.progress = (progress.completedLessons.length / totalLessons) * 100;
//       }
  
//       // Save the updated progress record
//       await progress.save();
//       console.log("Progress updated and saved successfully.");
  
//       return res.status(200).json({ progress, message: 'Lesson marked as read for Java' });
//     } catch (error) {
//       console.error('Error updating progress:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   };
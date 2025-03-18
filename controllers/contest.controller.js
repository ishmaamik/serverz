import Contest from "../models/contest.model.js";

export const updateContestProgress = async (req, res) => {
  try {
    const { userId, problemId, problemTitle, verdict, language, attemptedCount } = req.body;

    console.log("[DEBUG] Received contest progress update:", req.body);

    // Find the contest document for the user
    let contest = await Contest.findOne({ user: userId });

    // If no contest record exists for the user, create a new one
    if (!contest) {
      console.log("[DEBUG] Contest record not found. Creating a new one.");
      contest = new Contest({ user: userId });
    }

    // Always add the problem to the solved or attempted arrays (no checks)
    if (verdict === "AC") {
      contest.problemsSolved.push({ problemId, problemTitle });
      contest.solvedCount += 1;
      contest.totalSolved += 1; // Increment the total solved problems count
      contest.attemptedCount+= 1;
      contest.totalAttempted += 1;
      contest.languageStats[language].solved += 1; // Increment the solved count for the specific language
      console.log(`[DEBUG] Incrementing solved count for ${language}`);
    } else if (verdict === "WA" || verdict === "TLE") {
      contest.problemsAttempted.push({
        problemId,
        verdict,
        problemTitle
      });
      contest.attemptedCount+= 1; // Update the attemptedCount value received from frontend
      contest.totalAttempted += 1; // Increment the total attempted problems count
      contest.languageStats[language].attempted += 1; // Increment the attempted count for the specific language
      console.log(`[DEBUG] Incrementing attempted count for ${language}`);
    }

    // Save the updated contest document to the database
    await contest.save();
    console.log("[DEBUG] Contest progress updated and saved successfully.");

    // Respond with the updated contest progress
    res.status(200).json({
      success: true,
      data: contest,
    });
  } catch (error) {
    console.error("[DEBUG] Error while updating contest progress:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

    

export const getContestProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const contest = await Contest.findOne({ user: userId });

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "No contest progress found",
      });
    }

    console.log("[DEBUG] Contest Data:", contest);

    res.status(200).json({
      success: true,
      data: {
        solvedCount: contest.solvedCount,
        attemptedCount: contest.attemptedCount,
        totalSolved: contest.totalSolved,
        totalAttempted: contest.totalAttempted,
        problemsSolved: contest.problemsSolved, // Make sure to include this
        languageStats: contest.languageStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getRecentActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find the contest document for the user
    const contest = await Contest.findOne({ user: userId }).select('problemsSolved problemsAttempted');

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "No contest progress found for this user",
      });
    }

    // Map solved problems with solvedAt timestamp
    const recentSolved = contest.problemsSolved.map(problem => ({
      problemId: problem.problemId,
      problemTitle: problem.problemTitle,
      time: problem.solvedAt,  // Use solvedAt for solved problems
      verdict: "Accepted",
      isSolved: true,
    }));

    // Map attempted problems with attemptedAt timestamp
    const recentAttempted = contest.problemsAttempted.map(problem => ({
      problemId: problem.problemId,
      problemTitle: problem.problemTitle,
      time: problem.attemptedAt,  // Use attemptedAt for attempted problems
      verdict: problem.verdict === "WA" ? "Wrong Answer" : "Time Limit Exceeded",
      isSolved: false,
    }));

    // Combine both solved and attempted problems
    const combinedActivity = [
      ...recentSolved,
      ...recentAttempted,
    ];

    // Sort the combined array by the latest time (either solvedAt or attemptedAt)
    const sortedActivity = combinedActivity.sort((a, b) => b.time - a.time);

    // Select the latest 3 activities
    const recentActivity = sortedActivity.slice(0, 10);

    res.status(200).json({
      success: true,
      data: recentActivity,
    });
    console.log("Recent Activity:", recentActivity);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

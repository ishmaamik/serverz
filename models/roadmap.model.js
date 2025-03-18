import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goals: {
      primaryGoal: String,
      specificArea: String,
    },
    experience: {
      selfAssessment: [String],
      description: String,
    },
    timeCommitment: {
      hoursPerWeek: String,
      pace: String,
    },
    preferences: {
      learningStyle: String,
      difficulty: String,
    },
    languages: [
      {
        name: String,
        priority: Number,
      },
    ],
    generatedRoadmap: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;

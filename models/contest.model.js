import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemsSolved: [
      {
        problemId: {
          type: String,
          required: true,
        },
        problemTitle: {
          type: String,
        },
        solvedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    problemsAttempted: [
      {
        problemId: {
          type: String,
          required: true,
        },
        problemTitle: {
          type: String,
        },
        verdict: {
          type: String,
          enum: ["WA", "TLE"],
          required: true,
        },
        attemptedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    solvedCount: {
      type: Number,
      default: 0,
    },
    attemptedCount: {
      type: Number,
      default: 0,
    },
    totalSolved: {
      type: Number,
      default: 0,
    },
    totalAttempted: {
      type: Number,
      default: 0,
    },
    languageStats: {
      python: {
        solved: { type: Number, default: 0 },
        attempted: { type: Number, default: 0 },
      },
      javascript: {
        solved: { type: Number, default: 0 },
        attempted: { type: Number, default: 0 },
      },
      cpp: {
        solved: { type: Number, default: 0 },
        attempted: { type: Number, default: 0 },
      },
      java: {
        solved: { type: Number, default: 0 },
        attempted: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true }
);

const Contest = mongoose.model('Contest', contestSchema);

export default Contest;

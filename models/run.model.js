import mongoose from "mongoose";

const runSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // Store date in dd-mm-yyyy format
      required: true,
    },
    language: {
      type: String, // Language of the run
      required: true,
    },
  },
  { timestamps: true }
);

const Run = mongoose.model("Run", runSchema);

export default Run;

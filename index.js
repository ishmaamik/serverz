import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js"; // Import the blog routes
import { problemDetails } from "./routes/problemDetails.route.js";
import { problemsTable } from "./routes/problemsTable.route.js";
import Rmap from "./routes/roadmap.route.js";
import runRoutes from "./routes/run.route.js";
import userRoutes from "./routes/user.route.js";
import contestRoutes from "./routes/contest.route.js";
import progressRoutes from "./routes/progressRoutes.js";
//import jprogressRoutes from "./routes/JJavaRoutes.js"

dotenv.config();

const app = express();

app.use(cors()); // Allow all origins or specify only localhost

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/run", runRoutes);
app.use("/api/roadmap", Rmap);
app.use("/api/contest", contestRoutes);
app.use("/problemsTable", problemsTable);
app.use("/problem/:id", problemDetails);
app.use(progressRoutes);
//app.use(jprogressRoutes);

app.post("/api/execute", async (req, res) => {
  const { script, language, input } = req.body; // Get the C code from the request

  // Create the payload to send to JDoodle API
  const program = {
    script: script,
    language: language,
    stdin: input,
    versionIndex: "0",
    clientId: process.env.JDOODLE_CLIENT_ID,
    clientSecret: process.env.JDOODLE_CLIENT_SECRET,
  };

  try {
    // Make a POST request to JDoodle API
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      program
    );
    const output = response.data.output;
    const awaitingInput = output.toLowerCase().includes("enter");
    return res.status(200).json({ output: response.data.output });
  } catch (error) {
    return res.status(500).json({ error: "Failed to execute code." });
  }
});

app.use(express.static(path.join(__dirname, "client","dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(process.env.PORT, '0.0.0.0',() => {
  console.log("Server listening on port 3000");
});

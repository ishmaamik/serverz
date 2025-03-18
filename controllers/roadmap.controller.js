import Roadmap from "../models/roadmap.model.js";
import { Groq } from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY,
});

export const generateRoadmap = async (req, res) => {
  try {
    const { userId, ...formData } = req.body;

    // Groq AI Integration
    const prompt = `
      Create a 4-week learning roadmap for ${formData.languages
        .map((l) => l.name)
        .join(", ")} 
      focusing on ${formData.goals.specificArea}. 
      User experience: ${formData.experience.description}. 
      Format: A human-readable string with weekly topics, projects, and resources, using bullet points.
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.9,
    });

    const roadmapContent = completion.choices[0].message.content;
    // Save to database
    const roadmap = await Roadmap.create({
      user: userId,
      ...formData,
      generatedRoadmap: roadmapContent,
    });

    res.status(201).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("Roadmap generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate roadmap",
      error: error.message,
    });
  }
};

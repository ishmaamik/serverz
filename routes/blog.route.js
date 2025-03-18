import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { createBlog, getAllBlogs } from "../controllers/blogcontroller.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_media", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "mp4"], // Supported file formats
  },
});

const upload = multer({ storage });

// Route to create a blog with media upload
router.post("/", upload.single("media"), createBlog);

// Route to get all blogs
router.get("/", getAllBlogs);

export default router;

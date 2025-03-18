// import Blog from "../models/blog.js";

// // Create a new blog post
// export const createBlog = async (req, res) => {
//   const { title, content, author } = req.body;

//   try {
//     const newBlog = new Blog({
//       title,
//       content,
//       author,
//     });

//     await newBlog.save();
//     res.status(201).json({ success: true, blog: newBlog });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get all blog posts
// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort blogs by creation date, most recent first
//     if (!blogs) {
//       return res.status(404).json({ success: false, message: "No blogs found" });
//     }
//     res.status(200).json({ success: true, blogs }); // Return the blogs in response
//   } catch (err) {
//     console.log(err); // Log any errors to the console for debugging
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

import Blog from "../models/blog.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const mediaUrl = req.file ? req.file.path : null; // Get Cloudinary URL from Multer upload
    const newBlog = new Blog({
      title,
      content,
      author,
      media: mediaUrl, // Save the media URL
    });

    await newBlog.save();
    res.status(201).json({ success: true, blog: newBlog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort blogs by creation date, most recent first
    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found" });
    }
    res.status(200).json({ success: true, blogs }); // Return the blogs in response
  } catch (err) {
    console.log(err); // Log any errors to the console for debugging
    res.status(500).json({ success: false, message: err.message });
  }
};

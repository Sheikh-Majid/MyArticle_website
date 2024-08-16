import cloudinary from "../db/cloudinary.js";
import getDataUri from "../db/dataUri.js";
import { Blog } from "../models/BlogModel.js";


export const NewBlog = async (req, res) => {
  try {
    const { title, descriptions, createdAt, fullName } = req.body;

    const image = req.file
   
    if(!title || !descriptions || !image || !fullName) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
  

   
     let cloudResponse;

     if (image) {
       const fileUri = getDataUri(image);
       cloudResponse = await cloudinary.uploader.upload(fileUri);
     }
    

   
    const newPost = new Blog({
      fullName,
      title,
      image: cloudResponse.secure_url,
      descriptions,
    });


    await newPost.save();

    // Return success response
    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      newPost,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error while creating blog post:", error);

    // Return server error response
    return res.status(500).json({
      message: "Error while creating blog post.",
      success: false,
    });
  }
};


export const getAllPost = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(401).json({
        message: "No Blog Created yet...",
        success: false,
      });
    }
    return res.status(200).json({
      message: "All Posts Fetched Successfully!",
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching all blog posts...",
      success: false,
    });
  }
};

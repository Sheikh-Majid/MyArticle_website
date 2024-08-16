import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the date when the document is created
  },
});

// Create the Item model using the schema
export const Blog = mongoose.model("Blog", BlogSchema);

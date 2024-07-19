import mongoose, { Schema } from "mongoose";

const blogSchema = Schema(
  {
    title: {
      type: String,
      default: "title", 
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,     
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId, 
      ref: "User",
      // required: true,
    },
    category: {
      type: String,
      // required: true, 
    },
    tags: {
      type: String,
    },
  }, 
  { timeStamps: true }  
);

                   

export const Blog = mongoose.model("Blog", blogSchema);
 
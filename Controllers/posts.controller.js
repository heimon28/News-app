import { Blog } from "../Models/blog.model.js";
import { asyncHandler } from "../Utilits/asyncHandlar.js";
import { ApiError } from "../Utilits/ApiErrors.js";
import { ApiResponse } from "../Utilits/ApiResponse.js";
import { uploadOnCloudinary } from "../Utilits/cloudinary.js";

const uploadPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!(title, content)) {
    throw new ApiError(400, "All fields are required");
  }

  const localImagePath = req.files?.image[0]?.path;
  console.log(localImagePath);
  if (!localImagePath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(localImagePath);

  if (!image) {
    throw new ApiError(400, "faild to upload on cloudinary");
  }


  const author = await Blog.author
  const blog = await Blog.create({
    title,
    content,
    author,
    image: image.url,
  });

  if (!blog) {
    throw new ApiError(400, "faild to create blog");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blog, "blog created successfully"));
});

const getAllPost = asyncHandler(async (req, res) => {
  const { limit, query, userId, page } = req.query;

  try {
    const posts = await Blog.find();
    if (!posts) {
      throw new ApiError(200, "no posts");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, posts, "All posts fetch successfully"));
  } catch (error) {
    throw new ApiError(500, "faild to fetch posts");
  }
});
     
const getPostById = asyncHandler(async (req, res) => {
  
     
  // const id = parseInt(req.params.id);
  const id = req.params._id;
   console.log(id);        
  // const allPosts = await Blog.find();
  // console.log('this is allpost', allPosts); 

  // const posts = await allPosts.filter((post) => post._id === id);
  // console.log('its post', posts);
  // return res.send(posts)  
  //  const {_id}= req.params   

   const posts = await Blog.findById(id) 
   console.log('its post', posts);
   return res.send(posts)
   
  // res.status(200).json(new ApiResponse(200, posts, "current video"));

});    

export { uploadPost, getAllPost, getPostById };

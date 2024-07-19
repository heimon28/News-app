import { upload } from "../Middleware/multer.middleware.js";
import { Router } from "express";
import {
  getAllPost,
  getPostById,
  uploadPost,
} from "../Controllers/posts.controller.js";
import { verfyJwt } from "../Middleware/auth.middleware.js";
const router = Router();

 
router
  .route("/")
  .get(getAllPost)
  .post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
      // {
      //   name: "coverImage",
      //   maxCount: 1,
      // },
    ]),
    uploadPost
  );

// app.get('/post/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   // console.log(id)
//   const blog = post.filter(b => b.id === id);
//   // console.log(blog)
//   res.send(blog)
// })
    
router
.route("/:id")
.get(getPostById);


export default router;

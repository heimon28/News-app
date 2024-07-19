import { Router } from "express";
import { getCurrentUser, login, registerUser } from "../Controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { verfyJwt } from "../Middleware/auth.middleware.js";

const router = Router();


router.route("/register").post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    }, 
    {
      name: 'coverImage',
      maxCount: 1,
    }, 
  ]),
  registerUser
);
 
// login route

router.route('/login').post(login)   

// secure route
router.route('/current-user').get(verfyJwt, getCurrentUser)

export default  router
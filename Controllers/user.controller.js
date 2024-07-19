import { User } from "../Models/users.model.js";
import { asyncHandler } from "../Utilits/asyncHandlar.js";
import { ApiError } from "../Utilits/ApiErrors.js";
import { ApiResponse } from "../Utilits/ApiResponse.js";
import { uploadOnCloudinary } from "../Utilits/cloudinary.js";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    console.log(user);
    const accessToken = user.generateAccessToken();
    console.log('first acc', accessToken);

    const refreshToken = user.generateRefreshToken();
console.log('first ref', refreshToken);


    user.refreshToken = refreshToken;

    // await user.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false }); 

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate token");
  }
};

// registration
const registerUser = asyncHandler(async (req, res, next) => {
  //get details from user frontend
  //validation
  //check if user already exist usernam and email
  //check for images, check for avatar
  //upload them to cloudinary, check avatar
  //create a user object, and create entry in db
  //remove password and refresh field from response
  //check for user creation
  //return response

  const { userName, fullName, email, password } = req.body;

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existUser = await User.findOne({
    $or: [{ userName, email }],
  });

  if (existUser) {
    throw new ApiError(409, "User with email or userName already exits");
  }

  const avatarLocalFilePath = req.files?.avatar[0]?.path;
  console.log("avatar local file path", avatarLocalFilePath);

  if (!avatarLocalFilePath) {
    throw new ApiError(400, "Avatar is required");
  }

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  )
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log("coverImage", coverImageLocalPath);

  //upload avatar to cloudinary
  const avatarCloudinaryUrl = await uploadOnCloudinary(avatarLocalFilePath);

  // upload coverImage to cloudinary
  const coverImageCloudinaryUrl = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarCloudinaryUrl) {
    throw new ApiError(400, "Avatar is required on local storage");
  }

  //creater a user object

  const user = await User.create({
    fullName,
    email,
    userName,
    password,
    avatar: avatarCloudinaryUrl.url,
    coverImage: coverImageCloudinaryUrl.url || "",
  });

  const createdUser = await User.findById(user._id).select("-password ");

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registration");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User register successfully"));
});

// login

const login = asyncHandler(async (req, res, next) => {
  // excreat data from req body
  // check username or email
  //find the user
  //check password
  //access and refresh token generate
  //sent token through cookie
  //send res as login

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }
  // find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "user didnt find");
  }
  // check password
  const isPasswordValid = await user.passwordCheck(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  console.log(`acc ${accessToken} ref ${refreshToken}`);

  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logedInUser,
          refreshToken,
        },
        "Login successful"
      )
    );
});

// logout
const logout = asyncHandler(async (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logout successfully"));
});
 
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully")); //modified
});

export { registerUser, login, getCurrentUser, logout };

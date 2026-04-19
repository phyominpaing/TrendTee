import type { Request, Response } from "express";
import { User } from "../models/user.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import generateToken from "../utils/generateToken.ts";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary.ts";

// @route POST - api/register
// @desc Register a new user
// @access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists with this email address");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    }
  },
);

// @route POST - api/login
// @desc Login to existing user's account
// @access Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser && (await existingUser.matchPassword(password))) {
    // token
    generateToken(res, existingUser._id);

    res.status(200).json({
      _id: existingUser._id,
    });
  } else {
    res.status(401);
    throw new Error("User not found with this credentials.");
  }
});

// @route POST - api/logout
// @desc Clear token and Logout from existing user's account
// @access Public

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out successfully." });
});

// @route POST - api/upload
// @desc Update or Upload user avatar
// @access Private
export const uploadAvatar = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { image_url } = req.body;

    const userDoc = await User.findById(user?._id).select("-password");

    if (userDoc?.avatar?.url) {
      await deleteImage(userDoc.avatar.public_alt);
    }

    const response = await uploadSingleImage(image_url, "trendtee.com/avatar");

    await User.findByIdAndUpdate(user?._id, {
      avatar: {
        url: response.image_url,
        public_alt: response.public_alt,
      },
    });

    res.status(200).json({ message: "Profile Uploaded Successfully." });
  },
);

// @route GET - api/me
// @desc Get Login User's information
// @access Private
export const getUserInfo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;

    const userDoc = await User.findById(user?._id).select("-password");

    res.status(200).json(userDoc);
  },
);

// // @route GET - api/update-email
// // @desc Update Login User's email
// // @access Private | User
// export const updateEmailAddress = asyncHandler(
//   async (req: AuthRequest, res: Response) => {
//     const { user } = req;
//     const { newEmail } = req.body;

//     const existingUserEmail = await User.findOne({ email: newEmail });

//     if (existingUserEmail) {
//       res.status(400);
//       throw new Error("User already exists with this email address");
//     }

//     await User.findByIdAndUpdate(user?._id, {
//       email: newEmail,
//     });

//     res.status(200).json({ message: "Updated Successfully." });
//   },
// );

// @route PATCH - api/user/update
// @desc Update user's name and email
// @access Private

export const updateUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { name, email } = req.body;

    // 🔹 Validate input
    if (!name || name.length < 3) {
      res.status(400);
      throw new Error("Name must be at least 3 characters.");
    }

    if (!email || !email.includes("@")) {
      res.status(400);
      throw new Error("Invalid email format.");
    }

    // 🔹 Check email already used by another user
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser._id.toString() !== user?._id.toString()) {
      res.status(400);
      throw new Error("Email already used by another user.");
    }

    // 🔹 Update user
    const updatedUser = await User.findByIdAndUpdate(user?._id, {
      name,
      email,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: updatedUser?.name,
        email: updatedUser?.email,
      },
    });
  },
);

import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user";
import Chat from "../models/chat";
import mongoose from "mongoose";
import { config } from "dotenv";
import { body, check, oneOf, validationResult } from "express-validator";
import {
  CustomError,
  User as IUser,
  Locals,
  RequestWithLocals,
} from "../../types";
import Post from "../models/post";
import Comment from "../models/comment";
import upload from "../config/multer";
import { s3Deletev3 } from "../config/s3";
import { logout_user } from "./authController";
import {
  removeAllLikes,
  removeAllPosts,
  removeAllComments,
  removeAllFriends,
  removeUser,
} from "./accountController";
import generateAltText from "../utils/generateAltText";

config();

// @desc    Get all users (public details)
// @route   GET /api/users
// @access  Private
export const user_list = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = (await User.find({})
      .populate("friends")
      .populate("friendRequests")
      .exec()) as IUser[];
    res.status(200).json(users);
  }
);

// @desc    Get a user (public details)
// @route   GET /api/users/:userId
// @access  Private
export const user_detail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.userId)
      .populate("friends")
      .exec();
    const posts = await Post.find({ author: user })
      .populate("author")
      .populate("likes")
      .exec();
    const comments = await Comment.find({ author: user }).exec();
    const likedPosts = await Post.find({ likes: user })
      .populate("likes")
      .populate("author")
      .exec();
    const likedComments = await Comment.find({ likes: user }).exec();

    res.status(200).json({ user, posts, comments, likedPosts, likedComments });
  }
);

// @desc    Update user details
// @route   GET /api/users/:userId/chats
// @access  Private

export const get_user_chats = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const chats = await Chat.find({ participants: userId })
    .populate("messages")
    .populate("participants")
    .populate("messages.author")
    .populate("messages.chat")
    .exec();

  res.status(200).json(chats);
});

// @desc    Update user details
// @route   PUT /api/users/:userId
// @access  Private
export const user_update = [
  // Validate and sanitize fields.
  body("fullName")
    .optional()
    .isString()
    .withMessage("Full Name must be a string"),
  body("bio").optional().isString().withMessage("Bio must be a string"),
  body("oldPassword")
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      if (value && !req.body.newPassword && !req.body.newPasswordConf) {
        throw new Error(
          "At least one of oldPassword, newPassword, or newPasswordConf is required"
        );
      }
      return true;
    }),
  body("newPassword")
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      if (value && !req.body.oldPassword && !req.body.newPasswordConf) {
        throw new Error(
          "At least one of oldPassword, newPassword, or newPasswordConf is required"
        );
      }
      return true;
    }),
  body("newPasswordConf")
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      if (value && !req.body.oldPassword && !req.body.newPassword) {
        throw new Error(
          "At least one of oldPassword, newPassword, or newPasswordConf is required"
        );
      }
      return true;
    }),
  asyncHandler(async (req: Request, res: Response) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const { fullName, bio, oldPassword, newPassword, newPasswordConf }: any =
      req.body;

    const user = req.user as IUser;

    const updatedFields: {
      fullName?: string;
      bio?: string;
      password?: string;
    } = {};

    if (fullName) {
      updatedFields.fullName = fullName;
    } else {
      updatedFields.fullName = user.fullName;
    }

    if (bio) {
      updatedFields.bio = bio;
    } else {
      updatedFields.bio = user.bio;
    }

    if (oldPassword) {
      const hashedPassword = await bcrypt.hash(oldPassword, 10);

      const user = await User.find({ password: hashedPassword }).exec();

      if (!user) {
        res
          .status(400)
          .json({ message: "You typed your old password incorrectly" });
        return;
      }

      if (newPassword !== newPasswordConf) {
        res.status(400).json({
          message: "'New Password' and 'Confirm New Password' are not equal ",
        });
        return;
      }
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      updatedFields.password = newHashedPassword;
    }
    // Get the user to be updated
    const updatedUser = (await User.findByIdAndUpdate(
      req.params.userId,
      updatedFields,
      { new: true }
    ).exec()) as IUser;

    res.json(updatedUser);
  }),
];

// @desc    Update user profile pic
// @route   PUT /api/users/:userId/avatar
// @access  Private
export const user_avatar_put = [
  upload.single("image"),
  body(
    "imageUpdated",
    "Must include whether the image has been updated"
  ).custom((value) => {
    if (
      value !== "false" &&
      value !== "true" &&
      value !== true &&
      value !== false
    ) {
      return false;
    }
    return true;
  }),
  // Process request after validation and sanitization
  asyncHandler(
    async (req: RequestWithLocals, res: Response, next: NextFunction) => {
      // Extract the validation errors from a request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // There are errors.
        res.status(400).json(errors.array());
        return;
      }

      const userId = req.params.userId;
      const user = (await User.findById(userId)
        .populate("friends")
        .populate("friendRequests.user")
        .exec()) as IUser;
      const locals = req.locals as Locals;

      const bucketName = process.env.AWS_BUCKET_NAME;

      if (!bucketName) {
        throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
      }

      if (req.file) {
        // Generate alt text for an image (if an image exists)
        // image exists
        const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${
          user.userName
        }_${locals.date}.${req.file.mimetype.split("/")[1]}`;
        const altText = await generateAltText(imageUrl);
        user.photo = {
          imageUrl,
          altText,
        };
      }

      if (
        user.photo &&
        user.photo.imageUrl &&
        req.body.imageUpdated &&
        !req.file
      ) {
        const imageUrl = user.photo.imageUrl;
        const path = imageUrl.substring(
          imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1
        );
        user.photo = undefined;
        await s3Deletev3(path);
      }

      await user.save();
      res.status(200).json(user);
    }
  ),
];

// @desc    Update user cover pic
// @route   PUT /api/users/:userId/cover
// @access  Private
export const user_cover_put = [
  upload.single("image"),
  body(
    "imageUpdated",
    "Must include whether the image has been updated"
  ).custom((value) => {
    if (
      value !== "false" &&
      value !== "true" &&
      value !== true &&
      value !== false
    ) {
      return false;
    }
    return true;
  }),
  // Process request after validation and sanitization
  asyncHandler(
    async (req: RequestWithLocals, res: Response, next: NextFunction) => {
      // Extract the validation errors from a request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // There are errors.
        res.status(400).json(errors.array());
        return;
      }

      const userId = req.params.userId;
      const user = (await User.findById(userId)
        .populate("friends")
        .populate("friendRequests.user")
        .exec()) as IUser;
      const locals = req.locals as Locals;

      const bucketName = process.env.AWS_BUCKET_NAME;

      if (!bucketName) {
        throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
      }

      if (req.file) {
        // Generate alt text for an image (if an image exists)
        // image exists
        const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${
          user.userName
        }_${locals.date}.${req.file.mimetype.split("/")[1]}`;
        const altText = await generateAltText(imageUrl);
        user.cover = {
          imageUrl,
          altText,
        };
      }

      if (
        user.cover &&
        user.cover.imageUrl &&
        req.body.imageUpdated &&
        !req.file
      ) {
        const imageUrl = user.cover.imageUrl;
        const path = imageUrl.substring(
          imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1
        );
        user.cover = undefined;
        await s3Deletev3(path);
      }

      await user.save();
      res.status(200).json(user);
    }
  ),
];

// @desc    Get all images related to a user
// @route   GET /api/user/:userId/images
// @access  Private
export const user_images = asyncHandler(async (req, res, next) => {
  const user = (await User.findById(req.params.userId)
    .populate("friends")
    .exec()) as IUser;
  const posts = await Post.find({ author: user })
    .populate("author")
    .populate("likes")
    .exec();

  // Create an array to store all the photo objects
  const allPhotos = [];

  // Add user cover photo to the array
  if (user?.cover) {
    allPhotos.push({
      imageUrl: user.cover.imageUrl,
      altText: user.cover.altText,
    });
  }

  // Add user photo to the array
  if (user?.photo) {
    allPhotos.push({
      imageUrl: user.photo.imageUrl,
      altText: user.photo.altText,
    });
  }

  // Add post photos to the array
  for (const post of posts) {
    if (post.photo) {
      allPhotos.push({
        imageUrl: post.photo.imageUrl,
        altText: post.photo.altText,
      });
    }
  }

  res.status(200).json(allPhotos);
});

// @desc    Delete single user
// @route   DELETE /api/user/:userId
// @access  Private
export const user_delete = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // User found, continue with deletion operations
    await removeAllLikes(req.params.userId);
    await removeAllPosts(req.params.userId);
    await removeAllComments(req.params.userId);
    await removeAllFriends(req.params.userId);
    await removeUser(req.params.userId);

    // Log the user out
    logout_user(req, res, next);
  }
);

// @desc    Get all posts making up a user's feed, sorted by date recency (consider limiting to past X months only)
// @route   GET /api/user/:userId/feed
// @access  Private
export const user_feed = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser; // Assuming user is authenticated and stored in req.user

    // Find the current user and their friends' posts
    const users = [user, ...user.friends];
    const posts = await Post.find({ author: { $in: users } })
      .populate("author")
      .populate("likes")
      .exec();

    // Sort the feed by date posted using native JS date comparisons
    const sortedFeed = posts.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    });

    res.status(200).json(sortedFeed);
  }
);

// @desc    Search for users
// @route   GET /api/search-users/:query
// @access  Private
export const user_search = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.params; // Assuming the search query is provided in the URL params

    const terms = query.trim().replace(/  +/g, " ").split(" ");
    const expressions = terms.map((term) => ({
      $or: [
        { fullName: { $regex: `^${term}`, $options: "i" } },
        { userName: { $regex: `^${term}`, $options: "i" } },
      ],
    }));

    const expression =
      terms.length === 1 ? expressions[0] : { $or: expressions };

    const users = await User.find(expression).exec();
    res.status(200).json(users);
  }
);

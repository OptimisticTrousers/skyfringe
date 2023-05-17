import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user";
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
import { removeAllLikes, removeAllPosts, removeAllComments, removeAllFriends, removeUser } from "./accountController";

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
    const likedPosts = await Post.find({ likes: user }).exec();
    const likedComments = await Comment.find({ likes: user }).exec();

    res.status(200).json({ user, posts, comments, likedPosts, likedComments });
  }
);

// @desc    Update user details
// @route   PUT /api/users/:userId
// @access  Private
export const user_update = [
  upload.single("image"),
  // Validate and sanitize fields.
  body("fullName", "Full name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const oldPassword = req.body.oldPassword;

    const updatedFields = {
      fullName: req.body.fullName,
      bio: req.body.bio,
      password: undefined,
    };

    if (oldPassword) {
      const hashedPassword = await bcrypt.hash(req.body.oldPassword, 10);

      const user = await User.find({ password: hashedPassword }).exec();

      if (!user) {
        res
          .status(400)
          .json({ message: "You typed your old password incorrectly" });
        return;
      }

      if (req.body.newPassword !== req.body.newPasswordConf) {
        res.status(400).json({
          message: "'New Password' and 'Confirm New Password' are not equal ",
        });
        return;
      }
    }
    updatedFields.password = req.body.newPassword;
    // Get the user to be updated
    const updatedUser = (await User.findByIdAndUpdate(
      req.params.userId,
      updatedFields,
      { new: true }
    ).exec()) as IUser;

    const updatedUserObject = updatedUser.toObject();
    delete updatedUserObject.password;
    res.json(updatedUserObject);
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
      const user = (await User.findById(userId).exec()) as IUser;
      const locals = req.locals as Locals;

      const bucketName = process.env.AWS_BUCKET_NAME;

      if (!bucketName) {
        throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
      }

      if (req.file) {
        user.photo = {
          imageUrl: `${bucketName}/facebook_clone/${locals.path}/${
            locals.date
          }_${user.userName}.${req.file.mimetype.split("/")[1]}`,
          altText: "test",
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
      const user = (await User.findById(userId).exec()) as IUser;
      const locals = req.locals as Locals;

      const bucketName = process.env.AWS_BUCKET_NAME;

      if (!bucketName) {
        throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
      }

      if (req.file) {
        user.cover = {
          imageUrl: `${bucketName}/facebook_clone/${locals.path}/${
            locals.date
          }_${user.userName}.${req.file.mimetype.split("/")[1]}`,
          altText: "test",
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

// @desc    Delete single user
// @route   DELETE /api/user/:userId
// @access  Private
export const user_delete = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // User found, continue with deletion operations
  await removeAllLikes(req.params.userId);
  await removeAllPosts(req.params.userId);
  await removeAllComments(req.params.userId);
  await removeAllFriends(req.params.userId);
  await removeUser(req.params.userId);

  // Log the user out
  logout_user(req, res, next)
});

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
    const expressions = [
      { fullName: { $regex: terms[0], $options: "i" } },
      { userName: { $regex: terms[0], $options: "i" } },
    ];

    if (terms[1]) {
      expressions.push({ fullName: { $regex: terms[1], $options: "i" } });
      expressions.push({ userName: { $regex: terms[1], $options: "i" } });
    }

    let expression = {};

    if (!terms[1]) {
      expression = {
        $or: [
          { fullName: { $regex: `^${terms[0]}`, $options: "i" } },
          { userName: { $regex: `^${terms[0]}`, $options: "i" } },
        ],
      };
    } else {
      expression = {
        $or: [
          {
            $and: [
              { fullName: { $regex: `^${terms[0]}`, $options: "i" } },
              { userName: { $regex: `^${terms[1]}`, $options: "i" } },
            ],
          },
          {
            $and: [
              { fullName: { $regex: `^${terms[1]}`, $options: "i" } },
              { userName: { $regex: `^${terms[0]}`, $options: "i" } },
            ],
          },
        ],
      };
    }

    const users = await User.find(expression).exec();
    res.status(200).json(users);
  }
);

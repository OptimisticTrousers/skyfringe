import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user";
import mongoose from "mongoose";
import { body, check, oneOf, validationResult } from "express-validator";
import { CustomError, User as IUser } from "../../types";
import Post from "../models/post";
import Comment from "../models/comment";
import upload from "../config/multer";

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

export const user_posts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const posts = await Post.find({ author: user }).exec();
    res.status(200).json(posts);
  }
);

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

export const user_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const user_feed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;

  // Find all posts from user's friends
  const friendPosts = await Post.find({
    author: { $in: user.friends },
    is_reported: false,
  })
    .populate("author", "fullName userName photo")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "fullName userName photo",
      },
    })
    .sort("-createdAt");

  // Find all posts where the user or their friends have commented
  const commentedPosts = await Post.find({
    $or: [
      { author: user._id },
      { author: { $in: user.friends } },
      { "comments.author": { $in: user.friends } },
      { "comments.author": user._id },
    ],
    is_reported: false,
  })
    .populate("author", "fullName userName photo")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "fullName userName photo",
      },
    })
    .sort("-createdAt");

  // Merge the two arrays of posts and remove duplicates
  const allPosts = [...friendPosts, ...commentedPosts];
  const uniquePosts = allPosts.filter(
    (post, index, self) =>
      index === self.findIndex((p) => p._id.toString() === post._id.toString())
  );

  res.status(200).json(uniquePosts);
};

// @desc    Get all friends/friend requests of a user sorted by request status
// @route   GET /api/user/:userId/friends
// @access  Private
export const user_friends = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (await User.findById(req.params.userId)
      .populate("friends")
      .populate({
        path: "friendRequests",
        populate: { path: "user", model: "User" },
      })
      .exec()) as IUser;

    res
      .status(200)
      .json({ friendRequests: user.friendRequests, friends: user.friends });
  }
);

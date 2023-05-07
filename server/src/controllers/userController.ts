import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import mongoose from "mongoose";
import { body, oneOf, validationResult } from "express-validator";
import { User as IUser } from "../../types";
import Post from "../models/post";

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
    const user = (await User.findById(req.params.userId)
      .populate("friends")
      .populate("friendRequests")
      .exec()) as IUser;
    const posts = await Post.find({ author: user })
      .populate("author")
      .populate("likes")
      .exec();
    // Add the posts property to the user object
    const userWithPosts = {
      ...user.toObject(),
      posts,
    };

    res.status(200).json(userWithPosts);
  }
);

export const user_update = [
  oneOf(
    [
      body("fullName").exists(),
      body("bio").exists(),
      body("photo").exists(),
      body("cover").exists(),
    ],
    "At least one of the following fields must be present: fullName, bio, photo, cover"
  ),
  asyncHandler(async (req: Request, res: Response) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const updatedFields = {
      fullName: req.body.fullName,
      bio: req.body.bio,
      photo: req.body.photo,
      cover: req.body.cover,
    };

    // Get the user to be updated
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      updatedFields,
      { new: true }
    ).exec();

    // Check if the id provided is valid
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = updatedUser.toObject();
    delete user.password;
    res.json(user);
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

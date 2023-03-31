import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import Post from "../models/post";
import mongoose from "mongoose";

export const user_list = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const user_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const user_update = [];

export const user_posts = asyncHandler(async (req: Request, res: Response) => {
  const ObjectId = mongoose.Types.ObjectId;
  const userId = req.params.userId;
  const userObjectId = new ObjectId(userId);
  const user = await User.findById(userObjectId).exec();
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const posts = await Post.find({ author: userId }).exec();

  res.json({ posts });
});

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
  const user = req.user as any;

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

  res.status(200).json({ posts: uniquePosts });
};

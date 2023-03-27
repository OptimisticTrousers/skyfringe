import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";

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
  const user = req.user._id as any;
  const friends = req.user.friends as any;

  const likedPosts = await Post.find({ likes: user })
    .populate("author")
    .populate("comments.author")
    .sort("-createdAt");

  const commentedPosts = await Comment.find({ author: user })
    .populate("post")
    .populate({
      path: "post",
      populate: { path: "author", select: "fullName" },
    })
    .populate({
      path: "post",
      populate: { path: "comments", populate: { path: "author" } },
    })
    .sort("-createdAt");

  const friendPosts = await Post.find({ author: { $in: friends } })
    .populate("author")
    .populate("comments.author")
    .sort("-createdAt");

  const feed = likedPosts
    .concat(commentedPosts.map((c: any) => c.post))
    .concat(friendPosts);
  res.json(feed);
};

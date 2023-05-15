import mongoose from "mongoose";
import Post from "../models/post";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

const validatePostId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }
    const post = await Post.findById(req.params.postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    next();
  }
);

export default validatePostId;

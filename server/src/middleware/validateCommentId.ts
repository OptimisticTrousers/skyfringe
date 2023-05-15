import mongoose from "mongoose";
import Comment from "../models/comment";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

const validateCommentId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      res.status(400).json({ message: "Invalid comment ID" });
      return;
    }
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    next();
  }
);

export default validateCommentId;

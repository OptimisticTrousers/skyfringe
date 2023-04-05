import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/comment";

export const comment_list = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const comment_create = [];

export const comment_update = [];

export const comment_delete = asyncHandler(async (req: any, res: Response) => {
  const commentId = req.params.commentId;

  const comment = await Comment.findById(commentId).populate("author").exec();

  if (comment && comment.author._id !== req.user._id) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  res.status(200).json(deletedComment);
});

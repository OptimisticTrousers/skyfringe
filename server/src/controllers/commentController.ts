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

// @desc    Delete single comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
export const comment_delete = asyncHandler(async (req: any, res: Response) => {
  const commentId = req.params.commentId;

  const comment = await Comment.findById(commentId).exec();

  if (!comment?.author.equals(req.user._id)) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  res.status(200).json(deletedComment);
});

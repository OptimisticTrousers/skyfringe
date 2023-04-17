import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";

export const comment_list = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const comment_create = [];

// @desc    Update single post
// @route   PUT /api/posts/:postId/comments/:commentId
// @access  Private
export const comment_update = [
  body("content", "Content is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: any, res: any, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const commentId = req.params.commentId;

    const comment = await Comment.findById(commentId).exec();

    if (comment && comment.author !== req.user._id) {
      // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content: req.body.content },
      { new: true }
    );

    res.status(200).json(updatedComment);
  }),
];

// @desc    Delete single comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
export const comment_delete = asyncHandler(async (req: any, res: Response) => {
  const commentId = req.params.commentId;

  const comment = await Comment.findById(commentId).exec();

  if (comment && comment.author !== req.user._id) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  res.status(200).json(deletedComment);
});

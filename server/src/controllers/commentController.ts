import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

export const comment_list = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const comment_create = [];

// @desc    Like a single post (i.e. add new user to likes array)
// @route   PUT /api/posts/:postId/comments/:commentId/likes
// @access  Private
export const comment_like = asyncHandler(async (req: any, res: any, next: any) => {
  // fetch
  const comment : any = await Comment.findById(req.params.commentId).exec();

  // Check if the user has already liked this post (i.e. their user ID already exists in likes array)
  // const alreadyLiked = post.likes.some((user) => user.equals(req.user._id));

  const alreadyLikedIndex = comment.likes.findIndex((like: any) =>
    like.equals(new mongoose.Types.ObjectId(req.user._id))
  );

  if (alreadyLikedIndex === -1) {
    // post is not liked
    comment.likes.push(req.user._id);
  } else {
    // remove like on the post
    comment.likes.splice(alreadyLikedIndex, 1);
  }

  await comment.save();
  res.status(200).json(comment); // Return status OK and updated comment to client
});

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

  if (!comment?.author.equals(req.user._id)) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  res.status(200).json(deletedComment);
});

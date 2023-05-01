import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import Comment from "../models/comment";
import { User as IUser, Comment as IComment } from "../../../shared/types";

// @desc    Get post comments
// @route   GET /api/posts/:postId/comments
// @access  Private
export const comment_list = asyncHandler(
  async (req: Request, res: Response) => {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author")
      .populate("likes")
      .populate("post")
      .exec();

    res.status(200).json(comments);
  }
);

// @desc    Add new comment
// @route   POST /api/posts/:postId/comments/
// @access  Private
export const comment_create = [
  body("content", "Content is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const user = req.user as IUser;

    const comment = new Comment({
      post: req.params.postId,
      author: user._id,
      content: req.body.content,
      likes: [],
    });

    await comment.populate("author");

    await comment.save();

    res.status(200).json(comment);
  }),
];

// @desc    Like a single post (i.e. add new user to likes array)
// @route   PUT /api/posts/:postId/comments/:commentId/likes
// @access  Private
export const comment_like = asyncHandler(
  async (req: Request, res: Response) => {
    // fetch
    const comment = (await Comment.findById(req.params.commentId)
      .populate("likes")
      .exec()) as IComment;

    // Check if the user has already liked this post (i.e. their user ID already exists in likes array) // const alreadyLiked = post.likes.some((user) => user.equals(req.user._id));

    const user = req.user as IUser;
    const alreadyLikedIndex = comment.likes.findIndex(
      (like: IUser) => like._id === user._id
    );

    if (alreadyLikedIndex === -1) {
      // post is not liked
      comment.likes.push(user);
    } else {
      // remove like on the post
      comment.likes.splice(alreadyLikedIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment); // Return status OK and updated comment to client
  }
);

// @desc    Update single post
// @route   PUT /api/posts/:postId/comments/:commentId
// @access  Private
export const comment_update = [
  asyncHandler(async (req: Request, res: Response) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const commentId = req.params.commentId;

    const comment = (await Comment.findById(commentId)
      .populate("likes")
      .populate("author")
      .exec()) as IComment;

    const user = req.user as IUser;

    if (!comment.author.equals(user)) {
      // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content: req.body.content },
      { new: true }
    )
      .populate("likes")
      .populate("author");

    res.status(200).json(updatedComment);
  }),
];

// @desc    Delete single comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
export const comment_delete = asyncHandler(
  async (req: Request, res: Response) => {
    const commentId = req.params.commentId;

    const comment = (await Comment.findById(commentId)
      .populate("author")
      .exec()) as IComment;

    const user = req.user as IUser;

    if (!comment.author.equals(user)) {
      // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    res.status(200).json(deletedComment);
  }
);

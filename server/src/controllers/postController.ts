import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import Post from "../models/post";
import upload from "../config/multer";
import mongoose from "mongoose";
import { s3Deletev3, s3Uploadv3 } from "../config/s3";
import { User as IUser, Post as IPost } from "../../../shared/types";

interface CustomError extends Error {
  status?: number;
}

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const post_list = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find({})
    .sort({ createdAt: 1 })
    .populate("author")
    .populate("likes")
    .exec();

  res.status(200).json(posts);
});

// @desc    Add new post
// @route   POST /api/posts
// @access  Private
export const post_create = [
  upload.single("image"),
  // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
  body("content").custom((value, { req }) => {
    if ((!value || value.trim().length === 0) && !req.file) {
      // neither text nor image has been provided
      const error: CustomError = new Error("Post text or image is required");
      error.status = 404;
      throw error;
    }
    // User has included one of either text or image. Continue with request handling
    return true;
  }),
  // Process request after validation and sanitization
  asyncHandler(async (req: Request, res: Response) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      res.status(400).json(errors.array());
      return;
    }

    console.log(req.file);

    const { content } = req.body;
    const user = req.user as IUser;
    // Create new post
    const post = new Post({
      author: user._id, // req.user is created by the auth middle when accessing any protected route
      ...(content && {
        content,
      }),
      likes: [],
      ...(req.file && {
        photo: {
          imageUrl: `${process.env.S3_BUCKET}/${user.userName}`,
          altText: "post image",
        },
      }),
    });

    const path = "posts";

    if (req.file) {
      await s3Uploadv3(path, req.file);
    }

    await post.save();

    res.status(200).json(post);
  }),
];

// @desc    Like a single post (i.e. add new user to likes array)
// @route   PUT /api/posts/:postId/likes
// @access  Private
export const post_like = asyncHandler(async (req: Request, res: Response) => {
  // fetch
  const post = (await Post.findById(req.params.postId)
    .populate("likes")
    .exec()) as IPost;

  // Check if the user has already liked this post (i.e. their user ID already exists in likes array)
  // const alreadyLiked = post.likes.some((user) => user.equals(req.user._id));

  const user = req.user as IUser;
  const alreadyLikedIndex = post.likes.findIndex(
    (like: IUser) => like._id === user._id
  );

  if (alreadyLikedIndex === -1) {
    // post is not liked
    post.likes.push(user);
  } else {
    // remove like on the post
    post.likes.splice(alreadyLikedIndex, 1);
  }

  await post.save();
  res.status(200).json(post); // Return status OK and updated comment to client
});

// @desc    Get single post
// @route   GET /api/posts/:postId
// @access  Private
export const post_detail = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId).populate("author").exec();

  if (!post) {
    // No results.
    res.status(404).json({ message: "Post not found" });
    return;
  }
  res.status(200).json(post);
});

// @desc    Update single post
// @route   PUT /api/posts/:postId
// @access  Private
export const post_update = [
  asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.postId;
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const post = (await Post.findById(postId)
      .populate("author")
      .exec()) as IPost;

    const user = req.user as IUser;

    if (!post.author.equals(user)) {
      // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const path = "posts";

    if (post?.photo?.imageUrl) {
      await s3Deletev3(path, `${post._id}${post.author.userName}`);
    }

    if (req.file) {
      await s3Uploadv3(path, req.file);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        content: req.body.content,
        ...(req.file && {
          photo: {
            imageUrl: `${post._id}${post.author.userName}`,
            altText: "test",
          },
        }),
      },
      { new: true }
    ).populate("author");

    res.status(200).json(updatedPost);
  }),
];

// @desc    Delete single post
// @route   DELETE /api/posts/:postId
// @access  Private
export const post_delete = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const post = (await Post.findById(postId).populate("author").exec()) as IPost;

  const user = req.user as IUser;
  if (!post.author.equals(user)) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  res.status(200).json(deletedPost);
});

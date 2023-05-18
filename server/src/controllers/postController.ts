import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import Post from "../models/post";
import upload from "../config/multer";
import mongoose from "mongoose";
import { s3Deletev3, s3Uploadv3 } from "../config/s3";
import {
  User as IUser,
  Post as IPost,
  CustomError,
  Locals,
  RequestWithLocals,
} from "../../types";
import generateAltText from "../utils/generateAltText";

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const post_list = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
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
      error.status = 400;
      throw error;
    }
    // User has included one of either text or image. Continue with request handling
    return true;
  }),
  // Process request after validation and sanitization
  asyncHandler(async (req: RequestWithLocals, res: Response) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      res.status(400).json(errors.array());
      return;
    }

    const { content } = req.body;
    const user = req.user as IUser;
    const locals = req.locals as Locals;

    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
    }

    // Generate alt text for an image (if an image exists)
    let altText = "";

    if (req.file) {
      // image exists
      altText = await generateAltText(req.file.path);
    }

    // Create new post
    const post = new Post({
      author: user._id, // req.user is created by the auth middle when accessing protected route
      content: content && content,
      photo: req.file && {
        imageUrl: `${bucketName}/facebook_clone/${locals.path}/${locals.date}_${
          user.userName
        }.${req.file.mimetype.split("/")[1]}`,
        altText,
      },
    });

    await post.populate("author");
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
    .populate("author")
    .populate("likes")
    .exec()) as IPost;

  // Check if the user has already liked this post (i.e. their user ID already exists in likes array)
  // const alreadyLiked = post.likes.some((user) => user.equals(req.user._id));

  const user = req.user as IUser;
  const alreadyLikedIndex = post.likes.findIndex((like: IUser) =>
    like._id.equals(user._id)
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

// @desc    Update single post
// @route   PUT /api/posts/:postId
// @access  Private
export const post_update = [
  upload.single("image"),
  // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
  body("content").custom((value, { req }) => {
    if ((!value || value.trim().length === 0) && !req.file) {
      // neither text nor image has been provided
      const error: CustomError = new Error("Post text or image is required");
      error.status = 400;
      throw error;
    }
    // User has included one of either text or image. Continue with request handling
    return true;
  }),
  body(
    "imageUpdated",
    "Must include whether the image has been updated"
  ).custom((value) => {
    if (
      value !== "false" &&
      value !== "true" &&
      value !== true &&
      value !== false
    ) {
      return false;
    }
    return true;
  }),
  // Process request after validation and sanitization
  asyncHandler(async (req: RequestWithLocals, res: Response) => {
    const postId = req.params.postId;
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const post = (await Post.findById(postId)
      .populate("author")
      .populate("likes")
      .exec()) as IPost;

    const user = req.user as IUser;
    const locals = req.locals as Locals;

    if (!post.author._id.equals(user._id)) {
      // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
    }

    const updatedPost = (await Post.findByIdAndUpdate(
      postId,
      { content: req.body.content },
      { new: true }
    )
      .populate("likes")
      .populate("author")
      .exec()) as IPost;

    if (req.file) {
      // Generate alt text for an image (if an image exists)
      // image exists
      const altText = await generateAltText(req.file.path);
      updatedPost.photo = {
        imageUrl: `${bucketName}/facebook_clone/${locals.path}/${locals.date}_${
          user.userName
        }.${req.file.mimetype.split("/")[1]}`,
        altText,
      };
    }

    if (
      updatedPost.photo &&
      updatedPost.photo.imageUrl &&
      req.body.imageUpdated &&
      !req.file
    ) {
      const imageUrl = updatedPost.photo.imageUrl;
      const path = imageUrl.substring(
        imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1
      );
      updatedPost.photo = undefined;
      await s3Deletev3(path);
    }

    await updatedPost.save();

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
  if (!post.author._id.equals(user._id)) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  if (post.photo && post.photo.imageUrl) {
    const imageUrl = post.photo.imageUrl;
    const path = imageUrl.substring(
      imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1
    );
    await s3Deletev3(path);
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  res.status(200).json(deletedPost);
});

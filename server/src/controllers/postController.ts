import { Request, Response, NextFunction } from "express";
import { body, oneOf, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import Post from "../models/post";
import upload from "../config/multer";
import mongoose from "mongoose";
import { s3Deletev3, s3Uploadv3 } from "../config/s3";

interface CustomError extends Error {
  status?: number;
}

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const post_list = (req: Request, res: Response, next: NextFunction) => {
  Post.find({})
    .sort({ createdAt: 1 })
    .populate("author")
    .populate("likes")
    .exec()
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
};

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
  async (req: any, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      res.status(400).json({ errors: errors.array() });
      return;
    }
    // Create new post
    const post = new Post({
      author: req.user._id, // req.user is created by the auth middle when accessing any protected route
      content: req.body.content,
      likes: [],
      ...(req.file && {
        photo: {
          imageUrl: `${process.env.S3_BUCKET}/${req.file.path}`,
          altText: "",
        },
      }),
    });

    const path = "posts";

    if (req.file) {
      await s3Uploadv3(path, req.file);
    }

    await post.save();

    res.status(200).json(post);
  },
];

// @desc    Like a single post (i.e. add new user to likes array)
// @route   PUT /api/posts/:postId/likes
// @access  Private
export const post_like = asyncHandler(async (req: any, res: any) => {
  // fetch
  const post: any = await Post.findById(req.params.postId).exec();

  // Check if the user has already liked this post (i.e. their user ID already exists in likes array)
  // const alreadyLiked = post.likes.some((user) => user.equals(req.user._id));

  const alreadyLikedIndex = post.likes.findIndex((like: any) =>
    like.equals(new mongoose.Types.ObjectId(req.user._id))
  );

  if (alreadyLikedIndex === -1) {
    // post is not liked
    post.likes.push(req.user._id);
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
export const post_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.findById(req.params.postId)
    .populate("author")
    .exec()
    .then((post) => {
      if (!post) {
        // No results.
        const err: CustomError = new Error("Post not found");
        err.status = 404;
        return next(err);
      }
      res.json({ post });
    })
    .catch(next);
};

// @desc    Update single post
// @route   PUT /api/posts/:postId
// @access  Private
export const post_update = [
  asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const post: any = await Post.findById(postId).populate("author").exec();

    if (!post?.author.equals(req.user._id)) {
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

    const updatedPost = await Post.findByIdAndUpdate(postId, {
      content: req.body.content,
      ...(req.file && {
        photo: {
          imageUrl: `${post._id}${post.author.userName}`,
          altText: "test",
        },
      }),
    });

    res.status(200).json(updatedPost);
  }),
];

// @desc    Delete single post
// @route   DELETE /api/posts/:postId
// @access  Private
export const post_delete = asyncHandler(async (req: any, res: Response) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId).exec();

  if (!post?.author.equals(req.user._id)) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  res.status(200).json(deletedPost);
});

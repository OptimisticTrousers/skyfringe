import { Request, Response, NextFunction } from "express";
import { body, oneOf, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import Post from "../models/post";
import upload from "../config/multer";

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
    .exec()
    .then((posts) => {
      res.json({ posts });
    })
    .catch(next);
};

// @desc    Add new post
// @route   POST /api/posts
// @access  Private
export const post_create = [
  upload.single("file"),
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
      photo: req.file && {
        imageUrl: `${process.env.S3_BUCKET}/${req.file.path}`,
        altText: "",
      },
    });

    await post.save();

    res.status(200).json({ post });
    return;
  },
];

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
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a Book object with escaped/trimmed data and old id.
    const post = new Post({
      _id: req.params.id,
      author: req.body.author,
      content: req.body.content,
      comments: req.body.comments,
      likes: req.body.likes,
    });

    Post.findByIdAndUpdate(req.params.postId, post, {})
      .exec()
      .then((post) => {
        res.json({ post });
      })
      .catch(next);
  },
];

// @desc    Delete single post
// @route   DELETE /api/posts/:postId
// @access  Private
export const post_delete = asyncHandler(async (req: any, res: Response) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId).exec();

  if (post && post.author !== req.user._id) {
    // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  res.status(200).json(deletedPost);
});

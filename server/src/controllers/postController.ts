import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/post";

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
  // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
  // body("content").custom((value, { req }) => {
  //   if ((!value || value.trim().length === 0) && !req.file) {
  //     // neither text nor image has been provided
  //     throw new Error("Post text or image is required");
  //   }
  //   // User has included one of either text or image. Continue with request handling
  //   return true;
  // }),
  // Process request after validation and sanitization
  (req: any, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    // Create new post
    console.log(req.body)
    const post = new Post({
      author: req.user._id, // req.user is created by the auth middle when accessing any protected route
      content: req.body.content,
      likes: [],
    });

    if (!errors.isEmpty()) {
      // There are errors.
      return res.status(400).json({ errors: errors.array() });
    }
    post.save((err) => {
      console.log(err)
      if (err) {
        return next(err);
      }
      res.status(200).json({ post });
    });
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
export const post_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Assume valid Post id in field.
  Post.findByIdAndRemove(req.params.postId)
    .exec()
    .then((post) => {
      res.json({ post });
    })
    .catch(next);
};

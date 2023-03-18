import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import { body, validationResult } from "express-validator";

export const post_list = (req: Request, res: Response, next: NextFunction) => {
  Post.find({})
    .sort({ createdAt: 1 })
    .populate("author")
    .exec()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      next(err);
    });
};

// @desc    Add new post
// @route   POST /api/posts
// @access  Private
export const post_create = [
  // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
  body("content").custom((value, { req }) => {
    if ((!value || value.trim().length === 0) && !req.file) {
      // neither text nor image has been provided
      throw new Error("Post text or image is required");
    }
    // User has included one of either text or image. Continue with request handling
    return true;
  }),
  // Process request after validation and sanitization
  (req: any, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    // Create new post
    const post = new Post({
      user: "6405360a990e06c35a62b94a", // req.user is created by the auth middle when accessing any protected route
      content: req.body.content,
      likes: [],
      comments: [],
      image: req.file && {
        imageId: req.file.filename,
        imageUrl: req.file.path,
        altText: "bob",
      },
    });

    if (!errors.isEmpty()) {
      // There are errors.
      return res.status(400).json({ errors: errors.array() });
    }
    post.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ post });
    });
  },
];

export const post_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.findById(req.params.postId)
    .populate("author")
    .exec()
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      next(err);
    });
};

export const post_update = [];

export const post_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

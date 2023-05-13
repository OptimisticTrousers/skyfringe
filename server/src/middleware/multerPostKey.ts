import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import Post from "../models/post";
import { Post as IPost } from "../../types";

const multerPostKey = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const post = (await Post.findById(req.params.postId).exec()) as IPost;
    req.key = {
      path: "posts",
    };
    if (post && post.photo && post.photo.imageUrl) {
      const imageUrl = post.photo.imageUrl;
      req.key.date = imageUrl.substring(
        imageUrl.lastIndexOf("/") + 1,
        imageUrl.lastIndexOf("_")
      );
    } else {
      req.key.date = Date.now().toString();
    }
    next();
  }
);

export default multerPostKey;

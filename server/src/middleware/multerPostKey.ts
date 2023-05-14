import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import Post from "../models/post";
import { Locals, Post as IPost, RequestWithLocals } from "../../types";

const multerPostKey = asyncHandler(
  async (req: RequestWithLocals, res: Response, next: NextFunction) => {
    const post = (await Post.findById(req.params.postId).exec()) as IPost;
    const locals = req.locals as Locals;
    locals.path = "posts";
    if (post && post.photo && post.photo.imageUrl) {
      const imageUrl = post.photo.imageUrl;
      locals.date = imageUrl.substring(
        imageUrl.lastIndexOf("/") + 1,
        imageUrl.lastIndexOf("_")
      );
    } else {
      locals.date = Date.now().toString();
    }
    next();
  }
);

export default multerPostKey;

import { Request, Response, NextFunction } from "express";
import Post from "../models/post";

const multerPostKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const post = await Post.findById(req.params.postId).exec();
  if (post && post.photo) {
    const imageUrl = post.photo.imageUrl;
    req.body = {
      ...req.body,
      path: "posts",
      date: imageUrl.substring(
        imageUrl.lastIndexOf("/") + 1,
        imageUrl.lastIndexOf("_")
      ),
    };
  }
  req.body = {
    ...req.body,
    path: "posts",
    date: Date.now().toString(),
  };
  next();
};

export default multerPostKey;

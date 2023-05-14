import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import Post from "../models/post";
import { Post as IPost, User as IUser } from "../../types";

const multerCoverKey = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    req.key = {
      path: "covers",
    };
    if (user && user.cover && user.cover.imageUrl) {
      const imageUrl = user.cover.imageUrl;
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

export default multerCoverKey;

import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import Post from "../models/post";
import {
  Locals,
  Post as IPost,
  RequestWithLocals,
  User as IUser,
} from "../../types";

const multerUserKey = asyncHandler(
  async (req: RequestWithLocals, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    req.locals = {
      path: "users",
    } as Locals;
    if (user && user.photo && user.photo.imageUrl) {
      const imageUrl = user.photo.imageUrl;
      req.locals.date = imageUrl.substring(
        imageUrl.lastIndexOf("/") + 1,
        imageUrl.lastIndexOf("_")
      );
    } else {
      req.locals.date = Date.now().toString();
    }
    next();
  }
);

export default multerUserKey;
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
    const locals = req.locals as Locals;
    locals.path = "users";
    if (user && user.photo && user.photo.imageUrl) {
      const imageUrl = user.photo.imageUrl;
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

export default multerUserKey;
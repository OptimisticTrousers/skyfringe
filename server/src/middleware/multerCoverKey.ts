import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import Post from "../models/post";
import { Locals, RequestWithLocals, User as IUser } from "../../types";

const multerCoverKey = asyncHandler(
  async (req: RequestWithLocals, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const locals = req.locals as Locals;
    locals.path = "covers";
    if (user && user.cover && user.cover.imageUrl) {
      const imageUrl = user.cover.imageUrl;
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

export default multerCoverKey;

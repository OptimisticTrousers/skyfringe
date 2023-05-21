import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import Post from "../models/post";
import { Locals, RequestWithLocals, User as IUser } from "../../types";

const multerCoverKey = asyncHandler(
  async (req: RequestWithLocals, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    req.locals = {
      path: "covers",
    } as Locals;
    if (user && user.cover && user.cover.imageUrl) {
      const imageUrl = user.cover.imageUrl;
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

export default multerCoverKey;

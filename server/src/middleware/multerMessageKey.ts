import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import { Locals, RequestWithLocals } from "../../types";

const multerMessageKey = asyncHandler(
  async (req: RequestWithLocals, res: Response, next: NextFunction) => {
    req.locals = {
      path: "messages",
      date: Date.now().toString(),
    } as Locals;
    next();
  }
);

export default multerMessageKey;

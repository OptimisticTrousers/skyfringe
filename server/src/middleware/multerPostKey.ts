import { NextFunction } from "express";

const multerPostKey = (req: any, res: any, next: NextFunction) => {
  req.key = {
    path: "posts",
    date: Date.now().toString(),
  };
  next();
};

export default multerPostKey;

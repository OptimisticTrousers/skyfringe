import mongoose from "mongoose";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

const validateUserId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    next();
  }
);

export default validateUserId;
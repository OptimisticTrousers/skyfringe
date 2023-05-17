import { Request, Response, NextFunction } from "express";
import { luffyId } from "../config/populateDB";

const restrictTestUserActions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  // If the user is operating a test account, certain actions cannot be performed like updating and deleting the test user account
  if (userId === luffyId.toString()) {
    res
      .status(400)
      .json({
        message: `Cannot perform a ${req.method} action with the test user`,
      });
  }
  next();
};

export default restrictTestUserActions;

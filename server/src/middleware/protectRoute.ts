import { Request, Response, NextFunction } from "express";

const protectRoute = (req: any, res: Response, next: NextFunction) => {
  // if user exists, the token was sent with the request
  if (req.user) {
    // if user exists then go to next middleware
    next();
  }
  // token not sent with request so send error to user
  else {
    res.status(500).json({ error: "login in required" });
  }
};

export default protectRoute;

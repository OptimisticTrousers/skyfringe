import { Request, NextFunction, Response } from "express";

const accessControlAllow = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};

export default accessControlAllow;

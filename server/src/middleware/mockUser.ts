import { Request, Response, NextFunction } from "express";
import { luffyId } from "../config/populateDB";

const mockUser = (req: Request, res: Response, next: NextFunction) => {
  // Replace with your mock user object
  const user = {
    _id: luffyId,
    fullName: "Monkey D. Luffy",
    userName: "luffy",
    email: "luffy@onepiece.com",
    password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
  };

  req.user = user;
  next();
};

export default mockUser;

import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { config } from "dotenv";
import { body, validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";
import User from "../models/user";
import cookieExtractor from "../middleware/cookieExtractor";
import { User as IUser } from "../../../shared/types";
import { luffyId } from "../config/populateDB";

config();

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// Handle register on POST
export const register_user = [
  // Validate and sanitize fields.
  body("fullName").trim().isLength({ min: 1 }).escape(),
  body("userName").trim().isLength({ min: 5 }).escape(),
  body("email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      } catch (err) {
        return Promise.reject("Server Error");
      }
    }),
  body("password").trim().isLength({ min: 8 }).escape(),
  // Process request after validation and sanitization.
  asyncHandler(async (req: Request, res: Response) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      res.status(400).json(errors.array());
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET value is not defined in .env file");
    }

    await user.populate("friends");

    await user.save();
    // If the JWT secret is available, sign a token and send it as a cookie to the browser
    const token = jwt.sign({ id: user._id }, secret);
    res
      .cookie("jwt", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      })
      .status(200)
      .json(user);
  }),
];

// @desc    Authenticate a test user
// @route   POST /api/auth/login
// @access  Public
export const login_user = [
  passport.authenticate("local", { session: false }),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Cast the standard Request object to my custom AuthenticatedRequest object
    const user = req.user as IUser;
    req.login(user, { session: false }, (err: Error) => {
      if (err) {
        return next(err);
      }

      // generate a signed json web token with the contents of the user objects and return it in the response
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET value is not defined in .env file");
      }

      const token = jwt.sign({ id: user._id }, secret);
      res
        .cookie("jwt", token, {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
        })
        .status(200)
        .json(user);
    });
  }),
];

// @desc    Logout a user
// @route   GET /api/auth/logout
// @access  Public
export const logout_user = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "User not logged in" });
    return;
  }

  res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "User successfully logged out" });
});

// @desc    Return the currently logged in user
// @route   GET /api/auth/current
// @access  Private
export const check_auth_user = asyncHandler(
  async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET value is not defined in .env file");
    }
    const token = cookieExtractor(req);
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
    const decodedToken = jwt.verify(token, secret) as { id: string };
    const user = await User.findById(decodedToken.id)
      .populate("friends")
      .populate("friendRequests");

    if (!user) {
      // user not found in db, above query returns null and clear the client's cookie
      res.status(401).json({ message: "No user found" }).clearCookie("jwt");
      return;
    }

    res.status(200).json(user);
  }
);

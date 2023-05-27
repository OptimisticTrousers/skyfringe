import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { config } from "dotenv";
import { body, validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";
import User from "../models/user";
import cookieExtractor from "../utils/cookieExtractor";
import { User as IUser } from "../../types";
import { luffyId } from "../config/populateDB";

config();

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// Handle register on POST
export const register_user = [
  // Validate and sanitize fields.
  body("fullName", "Full name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("userName", "Username must be at least 5 characters long")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("email", "Please enter a valid email address")
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
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({ min: 8 })
    .escape(),
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
    await user.populate("friendRequests.user");
    await user.save();
    // If the JWT secret is available, sign a token and send it as a cookie to the browser
    const token = jwt.sign({ id: user._id }, secret);
    res
      .cookie("jwt", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: false,
      })
      .status(200)
      .json(user);
  }),
];

// @desc    Authenticate a test user
// @route   POST /api/auth/login
// @access  Public
export const login_user = [
  body("email").normalizeEmail({ gmail_remove_dots: false }),
  body("password").trim().escape(),
  passport.authenticate("local", { session: false }),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Cast the standard Request object to my custom AuthenticatedRequest object
    const user = req.user as IUser;
    req.login(user, { session: false }, async (err: Error) => {
      if (err) {
        return next(err);
      }

      // generate a signed json web token with the contents of the user objects and return it in the response
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET value is not defined in .env file");
      }
      await user.populate("friends");
      await user.populate("friendRequests.user");

      const token = jwt.sign({ id: user._id }, secret);
      res
        .cookie("jwt", token, {
          secure: process.env.NODE_ENV === "production",
          httpOnly: false,
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
      .populate({
        path: "friendRequests",
        populate: { path: "user", model: "User" },
      })
      .exec();

    if (!user) {
      // user not found in db, above query returns null and clear the client's cookie
      res.status(401).json({ message: "No user found" }).clearCookie("jwt");
      return;
    }

    res.status(200).json(user);
  }
);

export const login_facebook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "facebook-token",
      { scope: ["email", "public_profile"], session: false },
      (err, user, info) => {
        // Cast the standard Request object to my custom AuthenticatedRequest object
        if (err || !user) {
          return res.status(400).json({
            message: "Something is not right",
            user: user,
            info: info,
          });
        }
        req.login(user, { session: false }, async (err) => {
          if (err) {
            return next(err);
          }

          // generate a signed json web token with the contents of the user objects and return it in the response
          const secret = process.env.JWT_SECRET;

          if (!secret) {
            throw new Error("JWT_SECRET value is not defined in .env file");
          }

          await user.populate("friends");
          await user.populate("friendRequests.user");
          const token = jwt.sign({ id: user._id }, secret);

          res
            .cookie("jwt", token, {
              secure: process.env.NODE_ENV === "production",
              httpOnly: false,
            })
            .status(200)
            .json(user);
        });
      }
    )(req, res);
  }
);

const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
  throw new Error("FRONTEND_URL value is not defined in .env file");
}

export const login_facebook_callback = [
  passport.authenticate("facebook", {
    failureRedirect: FRONTEND_URL,
    failureMessage: true,
    scope: ["email"],
  }),
  asyncHandler(async (req: Request, res: Response) => {
    res.redirect(FRONTEND_URL);
  }),
];

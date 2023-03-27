import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { config } from "dotenv";
import User from "../models/user";
import cookieExtractor from "../middleware/cookieExtractor";

config();

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
  (req: any, res: Response, next: NextFunction) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const user = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        // There are errors.
        return res.status(400).json({ errors: errors.array() });
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        const secret = process.env.JWT_SECRET;
        if (!cookieExtractor(req) && secret) {
          // If the JWT secret is available, sign a token and send it as a cookie to the browser
          const token = jwt.sign(user.toJSON(), secret, { expiresIn: "1h" });
          return res
            .cookie("jwt", token, {
              secure: false,
              httpOnly: true,
            })
            .status(200)
            .json({ user, token });
        }
        // If the JWT secret is not available, just return the user
        res.json({ user });
      });
    });
  },
];

export const login_user = [
  (req: any, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      req.body.email = "luffy@onepiece.com";
      req.body.password = "password";
    }
    // Extract validation errors from a
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      console.log(err, user, info);
      if (!user) {
        return res.sendStatus(403);
      }
      req.login(user, { session: false }, (err: Error) => {
        if (err) {
          return next(err);
        }
        // generate a signed json web token with the contents of the user objects and return it in the response
        const secret = process.env.JWT_SECRET;
        if (secret) {
          const token = jwt.sign(user.toJSON(), secret, { expiresIn: "1h" });
          return res
            .cookie("jwt", token, {
              secure: false,
              httpOnly: true,
            })
            .status(200)
            .json({ user, token });
        }
        // If the JWT secret is not available, just return the user
        res.json({ user });
      });
    })(req, res, next);
  },
];

// @desc    Authenticate a test user
// @route   POST /api/users/login/test
// @access  Public
export const login_test_user = [
  (req: any, res: Response, next: NextFunction) => {
    req.body.email = "luffy@onepiece.com";
    req.body.password = "password";
    next();
  },
];

export const logout_user = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const check_auth_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["jwt"];
  const secret = process.env.JWT_SECRET;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (secret) {
    const decodedToken = jwt.verify(token, secret) as { _id: string };
    const id = decodedToken._id;
    const user = await User.findById(id);

    if (!user) {
      // user not found in db, above query returns null and clear the client's cookie
      return res
        .status(401)
        .json({ message: "Unauthorized" })
        .clearCookie("jwt");
    }

    return res.status(200).json({
      message: "You're logged in",
      user: user,
    });
  }
  res.status(500).json({ message: "Issue getting user. Please try again" });
};

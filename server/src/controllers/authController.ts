import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";
import { NextFunction, Response, Request } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";

// Handle register on POST
const register_post = [
  // Validate and sanitize fields.
  body("firstName").trim().isLength({ min: 1 }).escape(),
  body("lastName").trim().isLength({ min: 1 }).escape(),
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
  body("password").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req: any, res: Response, next: NextFunction) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const user = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        // There are errors.
      } else {
        user.save((err) => {
          if (err) {
            return next(err);
          }
          // Successful - redirect to the log in page
          res.json({ user });
        });
      }
    });
  },
];

const login_post = [
  (req: any, res: Response, next: NextFunction) => {
    // Extract validation errors from a
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
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
          const token = jwt.sign(user, secret);
          return res.json({ user, token });
        }
      });
    })(req, res, next);
  },
];

export default {
  login_post,
  register_post
};

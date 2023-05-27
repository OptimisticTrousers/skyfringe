"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_facebook_callback = exports.login_facebook = exports.check_auth_user = exports.logout_user = exports.login_user = exports.register_user = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = require("dotenv");
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const cookieExtractor_1 = __importDefault(require("../utils/cookieExtractor"));
(0, dotenv_1.config)();
// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// Handle register on POST
exports.register_user = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("fullName", "Full name is required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("userName", "Username must be at least 5 characters long")
        .trim()
        .isLength({ min: 5 })
        .escape(),
    (0, express_validator_1.body)("email", "Please enter a valid email address")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: false })
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findOne({ email: value });
            if (user) {
                return Promise.reject("E-mail already in use");
            }
        }
        catch (err) {
            return Promise.reject("Server Error");
        }
    })),
    (0, express_validator_1.body)("password", "Password must be at least 8 characters long")
        .trim()
        .isLength({ min: 8 })
        .escape(),
    // Process request after validation and sanitization.
    (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // There are errors.
            res.status(400).json(errors.array());
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
        const user = new user_1.default({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        });
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET value is not defined in .env file");
        }
        yield user.populate("friends");
        yield user.populate("friendRequests.user");
        yield user.save();
        // If the JWT secret is available, sign a token and send it as a cookie to the browser
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
        res
            .cookie("jwt", token, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        })
            .status(200)
            .json(user);
    })),
];
// @desc    Authenticate a test user
// @route   POST /api/auth/login
// @access  Public
exports.login_user = [
    (0, express_validator_1.body)("email").normalizeEmail({ gmail_remove_dots: false }),
    (0, express_validator_1.body)("password").trim().escape(),
    passport_1.default.authenticate("local", { session: false }),
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Cast the standard Request object to my custom AuthenticatedRequest object
        const user = req.user;
        req.login(user, { session: false }, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            // generate a signed json web token with the contents of the user objects and return it in the response
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET value is not defined in .env file");
            }
            yield user.populate("friends");
            yield user.populate("friendRequests.user");
            const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
            res
                .cookie("jwt", token, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            })
                .status(200)
                .json(user);
        }));
    })),
];
// @desc    Logout a user
// @route   GET /api/auth/logout
// @access  Public
exports.logout_user = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie("jwt")
        .status(200)
        .json({ message: "User successfully logged out" });
}));
// @desc    Return the currently logged in user
// @route   GET /api/auth/current
// @access  Private
exports.check_auth_user = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET value is not defined in .env file");
    }
    const token = (0, cookieExtractor_1.default)(req);
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, secret);
    const user = yield user_1.default.findById(decodedToken.id)
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
}));
exports.login_facebook = [
    passport_1.default.authenticate("facebook-token", { session: false }),
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Cast the standard Request object to my custom AuthenticatedRequest object
        const user = req.user;
        req.login(user, { session: false }, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            // generate a signed json web token with the contents of the user objects and return it in the response
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET value is not defined in .env file");
            }
            yield user.populate("friends");
            yield user.populate("friendRequests.user");
            const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
            res
                .cookie("jwt", token, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            })
                .status(200)
                .json(user);
        }));
    })),
];
const FRONTEND_URL = process.env.FRONTEND_URL;
if (!FRONTEND_URL) {
    throw new Error("FRONTEND_URL value is not defined in .env file");
}
exports.login_facebook_callback = [
    passport_1.default.authenticate("facebook", {
        failureRedirect: FRONTEND_URL,
        failureMessage: true,
    }),
    (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.redirect(FRONTEND_URL);
    })),
];

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
exports.user_search = exports.user_feed = exports.user_delete = exports.user_images = exports.user_cover_put = exports.user_avatar_put = exports.user_update = exports.get_user_chats = exports.user_detail = exports.user_list = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const chat_1 = __importDefault(require("../models/chat"));
const dotenv_1 = require("dotenv");
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
const multer_1 = __importDefault(require("../config/multer"));
const s3_1 = require("../config/s3");
const authController_1 = require("./authController");
const accountController_1 = require("./accountController");
const generateAltText_1 = __importDefault(require("../utils/generateAltText"));
(0, dotenv_1.config)();
// @desc    Get all users (public details)
// @route   GET /api/users
// @access  Private
exports.user_list = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = (yield user_1.default.find({})
        .populate("friends")
        .populate("friendRequests")
        .exec());
    res.status(200).json(users);
}));
// @desc    Get a user (public details)
// @route   GET /api/users/:userId
// @access  Private
exports.user_detail = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.userId)
        .populate("friends")
        .exec();
    const posts = yield post_1.default.find({ author: user })
        .populate("author")
        .populate("likes")
        .exec();
    const comments = yield comment_1.default.find({ author: user }).exec();
    const likedPosts = yield post_1.default.find({ likes: user })
        .populate("likes")
        .populate("author")
        .exec();
    const likedComments = yield comment_1.default.find({ likes: user }).exec();
    res.status(200).json({ user, posts, comments, likedPosts, likedComments });
}));
// @desc    Update user details
// @route   GET /api/users/:userId/chats
// @access  Private
exports.get_user_chats = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const chats = yield chat_1.default.find({ participants: userId })
        .populate("messages")
        .populate("participants")
        .populate("messages.author")
        .populate("messages.chat")
        .exec();
    res.status(200).json(chats);
}));
// @desc    Update user details
// @route   PUT /api/users/:userId
// @access  Private
exports.user_update = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("fullName")
        .optional()
        .isString()
        .withMessage("Full Name must be a string"),
    (0, express_validator_1.body)("bio").optional().isString().withMessage("Bio must be a string"),
    (0, express_validator_1.body)("oldPassword")
        .isLength({ min: 8 })
        .custom((value, { req }) => {
        if (value && !req.body.newPassword && !req.body.newPasswordConf) {
            throw new Error("At least one of oldPassword, newPassword, or newPasswordConf is required");
        }
        return true;
    }),
    (0, express_validator_1.body)("newPassword")
        .isLength({ min: 8 })
        .custom((value, { req }) => {
        if (value && !req.body.oldPassword && !req.body.newPasswordConf) {
            throw new Error("At least one of oldPassword, newPassword, or newPasswordConf is required");
        }
        return true;
    }),
    (0, express_validator_1.body)("newPasswordConf")
        .isLength({ min: 8 })
        .custom((value, { req }) => {
        if (value && !req.body.oldPassword && !req.body.newPassword) {
            throw new Error("At least one of oldPassword, newPassword, or newPasswordConf is required");
        }
        return true;
    }),
    (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }
        const { fullName, bio, oldPassword, newPassword, newPasswordConf } = req.body;
        const user = req.user;
        const updatedFields = {};
        if (fullName) {
            updatedFields.fullName = fullName;
        }
        else {
            updatedFields.fullName = user.fullName;
        }
        if (bio) {
            updatedFields.bio = bio;
        }
        else {
            updatedFields.bio = user.bio;
        }
        if (oldPassword) {
            const hashedPassword = yield bcryptjs_1.default.hash(oldPassword, 10);
            const user = yield user_1.default.find({ password: hashedPassword }).exec();
            if (!user) {
                res
                    .status(400)
                    .json({ message: "You typed your old password incorrectly" });
                return;
            }
            if (newPassword !== newPasswordConf) {
                res.status(400).json({
                    message: "'New Password' and 'Confirm New Password' are not equal ",
                });
                return;
            }
            const newHashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
            updatedFields.password = newHashedPassword;
        }
        // Get the user to be updated
        const updatedUser = (yield user_1.default.findByIdAndUpdate(req.params.userId, updatedFields, { new: true }).exec());
        res.json(updatedUser);
    })),
];
// @desc    Update user profile pic
// @route   PUT /api/users/:userId/avatar
// @access  Private
exports.user_avatar_put = [
    multer_1.default.single("image"),
    (0, express_validator_1.body)("imageUpdated", "Must include whether the image has been updated").custom((value) => {
        if (value !== "false" &&
            value !== "true" &&
            value !== true &&
            value !== false) {
            return false;
        }
        return true;
    }),
    // Process request after validation and sanitization
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // There are errors.
            res.status(400).json(errors.array());
            return;
        }
        const userId = req.params.userId;
        const user = (yield user_1.default.findById(userId)
            .populate("friends")
            .populate("friendRequests.user")
            .exec());
        const locals = req.locals;
        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
        }
        if (req.file) {
            // Generate alt text for an image (if an image exists)
            // image exists
            const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${user.userName}_${locals.date}.${req.file.mimetype.split("/")[1]}`;
            const altText = yield (0, generateAltText_1.default)(imageUrl);
            user.photo = {
                imageUrl,
                altText,
            };
        }
        if (user.photo &&
            user.photo.imageUrl &&
            req.body.imageUpdated &&
            !req.file) {
            const imageUrl = user.photo.imageUrl;
            const path = imageUrl.substring(imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1);
            user.photo = undefined;
            yield (0, s3_1.s3Deletev3)(path);
        }
        yield user.save();
        res.status(200).json(user);
    })),
];
// @desc    Update user cover pic
// @route   PUT /api/users/:userId/cover
// @access  Private
exports.user_cover_put = [
    multer_1.default.single("image"),
    (0, express_validator_1.body)("imageUpdated", "Must include whether the image has been updated").custom((value) => {
        if (value !== "false" &&
            value !== "true" &&
            value !== true &&
            value !== false) {
            return false;
        }
        return true;
    }),
    // Process request after validation and sanitization
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // There are errors.
            res.status(400).json(errors.array());
            return;
        }
        const userId = req.params.userId;
        const user = (yield user_1.default.findById(userId)
            .populate("friends")
            .populate("friendRequests.user")
            .exec());
        const locals = req.locals;
        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
        }
        if (req.file) {
            // Generate alt text for an image (if an image exists)
            // image exists
            const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${user.userName}_${locals.date}.${req.file.mimetype.split("/")[1]}`;
            const altText = yield (0, generateAltText_1.default)(imageUrl);
            user.cover = {
                imageUrl,
                altText,
            };
        }
        if (user.cover &&
            user.cover.imageUrl &&
            req.body.imageUpdated &&
            !req.file) {
            const imageUrl = user.cover.imageUrl;
            const path = imageUrl.substring(imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1);
            user.cover = undefined;
            yield (0, s3_1.s3Deletev3)(path);
        }
        yield user.save();
        res.status(200).json(user);
    })),
];
// @desc    Get all images related to a user
// @route   GET /api/user/:userId/images
// @access  Private
exports.user_images = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield user_1.default.findById(req.params.userId)
        .populate("friends")
        .exec());
    const posts = yield post_1.default.find({ author: user })
        .populate("author")
        .populate("likes")
        .exec();
    // Create an array to store all the photo objects
    const allPhotos = [];
    // Add user cover photo to the array
    if (user === null || user === void 0 ? void 0 : user.cover) {
        allPhotos.push({
            imageUrl: user.cover.imageUrl,
            altText: user.cover.altText,
        });
    }
    // Add user photo to the array
    if (user === null || user === void 0 ? void 0 : user.photo) {
        allPhotos.push({
            imageUrl: user.photo.imageUrl,
            altText: user.photo.altText,
        });
    }
    // Add post photos to the array
    for (const post of posts) {
        if (post.photo) {
            allPhotos.push({
                imageUrl: post.photo.imageUrl,
                altText: post.photo.altText,
            });
        }
    }
    res.status(200).json(allPhotos);
}));
// @desc    Delete single user
// @route   DELETE /api/user/:userId
// @access  Private
exports.user_delete = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // User found, continue with deletion operations
    yield (0, accountController_1.removeAllLikes)(req.params.userId);
    yield (0, accountController_1.removeAllPosts)(req.params.userId);
    yield (0, accountController_1.removeAllComments)(req.params.userId);
    yield (0, accountController_1.removeAllFriends)(req.params.userId);
    yield (0, accountController_1.removeUser)(req.params.userId);
    // Log the user out
    (0, authController_1.logout_user)(req, res, next);
}));
// @desc    Get all posts making up a user's feed, sorted by date recency (consider limiting to past X months only)
// @route   GET /api/user/:userId/feed
// @access  Private
exports.user_feed = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Assuming user is authenticated and stored in req.user
    // Find the current user and their friends' posts
    const users = [user, ...user.friends];
    const posts = yield post_1.default.find({ author: { $in: users } })
        .populate("author")
        .populate("likes")
        .exec();
    // Sort the feed by date posted using native JS date comparisons
    const sortedFeed = posts.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    });
    res.status(200).json(sortedFeed);
}));
// @desc    Search for users
// @route   GET /api/search-users/:query
// @access  Private
exports.user_search = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.params; // Assuming the search query is provided in the URL params
    const terms = query.trim().replace(/  +/g, " ").split(" ");
    const expressions = terms.map((term) => ({
        $or: [
            { fullName: { $regex: `^${term}`, $options: "i" } },
            { userName: { $regex: `^${term}`, $options: "i" } },
        ],
    }));
    const expression = terms.length === 1 ? expressions[0] : { $or: expressions };
    const users = yield user_1.default.find(expression).exec();
    res.status(200).json(users);
}));

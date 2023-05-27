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
exports.post_delete = exports.post_update = exports.post_like = exports.post_create = exports.post_list = void 0;
const express_validator_1 = require("express-validator");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notification_1 = __importDefault(require("../models/notification"));
const post_1 = __importDefault(require("../models/post"));
const multer_1 = __importDefault(require("../config/multer"));
const s3_1 = require("../config/s3");
const generateAltText_1 = __importDefault(require("../utils/generateAltText"));
// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
exports.post_list = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.default.find({})
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("likes")
        .exec();
    res.status(200).json(posts);
}));
// @desc    Add new post
// @route   POST /api/posts
// @access  Private
exports.post_create = [
    multer_1.default.single("image"),
    // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
    (0, express_validator_1.body)("content").custom((value, { req }) => {
        if ((!value || value.trim().length === 0) && !req.file) {
            // neither text nor image has been provided
            const error = new Error("Post text or image is required");
            error.status = 400;
            throw error;
        }
        // User has included one of either text or image. Continue with request handling
        return true;
    }),
    // Process request after validation and sanitization
    (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // There are errors.
            res.status(400).json(errors.array());
            return;
        }
        const { content } = req.body;
        const user = req.user;
        const locals = req.locals;
        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
        }
        // Generate alt text for an image (if an image exists)
        let altText = "";
        // Create new post
        const post = new post_1.default({
            author: user._id,
            content: content && content,
        });
        if (req.file) {
            // image exists
            const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${user.userName}_${locals.date}.${req.file.mimetype.split("/")[1]}`;
            altText = yield (0, generateAltText_1.default)(imageUrl);
            post.photo = {
                imageUrl,
                altText,
            };
        }
        yield post.populate("author");
        yield post.save();
        res.status(200).json(post);
    })),
];
// @desc    Like a single post (i.e. add new user to likes array)
// @route   PUT /api/posts/:postId/likes
// @access  Private
exports.post_like = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch
    const post = (yield post_1.default.findById(req.params.postId)
        .populate("author")
        .populate("likes")
        .exec());
    // Check if the user has already liked this post (i.e. their user ID already exists in likes array)
    // const alreadyLiked = post.likes.some((user) => user.equals(req.user._id));
    const user = req.user;
    const alreadyLikedIndex = post.likes.findIndex((like) => like._id.equals(user._id));
    if (alreadyLikedIndex === -1) {
        // post is not liked
        post.likes.push(user);
        // Creating a new notification when a post is liked
        const notification = new notification_1.default({
            toUser: post.author._id,
            fromUser: user._id,
            reference: post._id,
            content: post.content
                ? `liked your post where you said '${post.content}'`
                : "liked your post",
            photo: post.photo && post.photo,
        });
        yield notification.save();
    }
    else {
        // remove like on the post
        post.likes.splice(alreadyLikedIndex, 1);
        // Deleting a notification when a post like is removed
        yield notification_1.default.findOneAndDelete({
            reference: post._id,
            toUser: post.author._id,
            fromUser: user._id,
            content: post.content
                ? `liked your post where you said '${post.content}'`
                : "liked your post",
            photo: post.photo && post.photo,
        });
    }
    yield post.save();
    res.status(200).json(post); // Return status OK and updated comment to client
}));
// @desc    Update single post
// @route   PUT /api/posts/:postId
// @access  Private
exports.post_update = [
    multer_1.default.single("image"),
    // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
    (0, express_validator_1.body)("content").custom((value, { req }) => {
        if ((!value || value.trim().length === 0) && !req.file) {
            // neither text nor image has been provided
            const error = new Error("Post text or image is required");
            error.status = 400;
            throw error;
        }
        // User has included one of either text or image. Continue with request handling
        return true;
    }),
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
    (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = req.params.postId;
        // Extract the validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }
        const post = (yield post_1.default.findById(postId)
            .populate("author")
            .populate("likes")
            .exec());
        const user = req.user;
        const locals = req.locals;
        if (!post.author._id.equals(user._id)) {
            // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
        }
        const updatedPost = (yield post_1.default.findByIdAndUpdate(postId, { content: req.body.content }, { new: true })
            .populate("likes")
            .populate("author")
            .exec());
        if (req.file) {
            // Generate alt text for an image (if an image exists)
            // image exists
            const altText = yield (0, generateAltText_1.default)(req.file.path);
            const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${user.userName}_${locals.date}.${req.file.mimetype.split("/")[1]}`;
            updatedPost.photo = {
                imageUrl,
                altText,
            };
        }
        if (updatedPost.photo &&
            updatedPost.photo.imageUrl &&
            req.body.imageUpdated &&
            !req.file) {
            const imageUrl = updatedPost.photo.imageUrl;
            const path = imageUrl.substring(imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1);
            updatedPost.photo = undefined;
            yield (0, s3_1.s3Deletev3)(path);
        }
        yield updatedPost.save();
        res.status(200).json(updatedPost);
    })),
];
// @desc    Delete single post
// @route   DELETE /api/posts/:postId
// @access  Private
exports.post_delete = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const post = (yield post_1.default.findById(postId).populate("author").exec());
    const user = req.user;
    if (!post.author._id.equals(user._id)) {
        // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
        res.status(403).json({ message: "Forbidden" });
        return;
    }
    if (post.photo && post.photo.imageUrl) {
        const imageUrl = post.photo.imageUrl;
        const path = imageUrl.substring(imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1);
        yield (0, s3_1.s3Deletev3)(path);
    }
    // Delete all notifications related to this post
    yield notification_1.default.deleteMany({ reference: post._id });
    const deletedPost = yield post_1.default.findByIdAndDelete(postId);
    res.status(200).json(deletedPost);
}));

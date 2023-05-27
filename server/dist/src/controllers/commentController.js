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
exports.comment_delete = exports.comment_update = exports.comment_like = exports.comment_create = exports.comment_list = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const comment_1 = __importDefault(require("../models/comment"));
const notification_1 = __importDefault(require("../models/notification"));
// @desc    Get post comments
// @route   GET /api/posts/:postId/comments
// @access  Private
exports.comment_list = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_1.default.find({ post: req.params.postId })
        .populate("author")
        .populate("likes")
        .populate("post")
        .exec();
    res.status(200).json(comments);
}));
// @desc    Add new comment
// @route   POST /api/posts/:postId/comments/
// @access  Private
exports.comment_create = [
    (0, express_validator_1.body)("content", "Content is required").trim().isLength({ min: 1 }).escape(),
    (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        // const postId = req.params.postId;
        // const post = await Post.findById(postId).populate("author").exec() as IPost;
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }
        const user = req.user;
        const comment = new comment_1.default({
            post: req.params.postId,
            author: user._id,
            content: req.body.content,
            likes: [],
        });
        yield comment.populate("author");
        yield comment.save();
        res.status(200).json(comment);
    })),
];
// @desc    Like a single post (i.e. add new user to likes array)
// @route   PUT /api/posts/:postId/comments/:commentId/likes
// @access  Private
exports.comment_like = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch
    const comment = (yield comment_1.default.findById(req.params.commentId)
        .populate("author")
        .populate("likes")
        .exec());
    // Check if the user has already liked this post (i.e. their user ID already exists in likes array) // const alreadyLiked = post.likes.some((user) => user.equals(req.user._id));
    const user = req.user;
    const alreadyLikedIndex = comment.likes.findIndex((like) => like._id.equals(user._id));
    if (alreadyLikedIndex === -1) {
        // post is not liked
        comment.likes.push(user);
        // Creating a new notification when a comment is liked
        const notification = new notification_1.default({
            toUser: comment.author._id,
            fromUser: user._id,
            reference: comment._id,
            content: `liked your comment where you said '${comment.content}'`,
        });
        yield notification.save();
    }
    else {
        // remove like on the post
        comment.likes.splice(alreadyLikedIndex, 1);
        // Deleting a notification when a post like is removed
        yield notification_1.default.findOneAndDelete({
            toUser: comment.author._id,
            fromUser: user._id,
            reference: comment._id,
            content: `liked your comment where you said '${comment.content}'`,
        });
    }
    yield comment.save();
    res.status(200).json(comment); // Return status OK and updated comment to client
}));
// @desc    Update single post
// @route   PUT /api/posts/:postId/comments/:commentId
// @access  Private
exports.comment_update = [
    (0, express_validator_1.body)("content", "Content is required").trim().isLength({ min: 1 }).escape(),
    (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the validation errors from a request.
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }
        const commentId = req.params.commentId;
        const comment = (yield comment_1.default.findById(commentId)
            .populate("likes")
            .populate("author")
            .exec());
        const user = req.user;
        if (!comment.author._id.equals(user._id)) {
            // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        const updatedComment = yield comment_1.default.findByIdAndUpdate(commentId, { content: req.body.content }, { new: true })
            .populate("likes")
            .populate("author");
        res.status(200).json(updatedComment);
    })),
];
// @desc    Delete single comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
exports.comment_delete = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const comment = (yield comment_1.default.findById(commentId)
        .populate("author")
        .exec());
    const user = req.user;
    if (!comment.author._id.equals(user._id)) {
        // it checks if the authenticated user ID matches the comment's author ID, and returns a 403 error if they don't match.
        res.status(403).json({ message: "Forbidden" });
        return;
    }
    // Delete all notifications related to this comment
    yield notification_1.default.deleteMany({ reference: comment._id });
    const deletedComment = yield comment_1.default.findByIdAndDelete(commentId);
    res.status(200).json(deletedComment);
}));

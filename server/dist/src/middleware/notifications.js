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
exports.send_accepted_request_notification = exports.send_unfriend_notification = exports.cancel_send_notification = exports.send_rejected_outgoing_notification = exports.send_outgoing_request_notification = exports.send_comment_like_notification = exports.send_post_like_notification = exports.send_comment_notification = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const comment_1 = __importDefault(require("../models/comment"));
const notification_1 = __importDefault(require("../models/notification"));
const user_1 = __importDefault(require("../models/user"));
const post_1 = __importDefault(require("../models/post"));
exports.send_comment_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const user = req.user;
    const comment = (yield comment_1.default.findById(commentId)
        .populate("likes")
        .exec());
    const post = (yield post_1.default.findById(postId)
        .populate("author")
        .exec());
    // If the user is not the same as the author who made the post(ie. you don't want to get notified for commenting on your own post), create a notification
    if (!post.author._id.equals(user._id)) {
        // If the comment actually exists
        if (comment) {
            const notification = new notification_1.default({
                toUser: post.author._id,
                fromUser: user._id,
                content: `commented on your post: "${comment.content}"`,
            });
            yield notification.save();
        }
        else {
            // If the comment does not exist anymore, delete the notification
            yield notification_1.default.findOneAndDelete({
                fromUser: user._id,
                toUser: post.author._id,
            }).exec();
        }
    }
    next();
}));
exports.send_post_like_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const user = req.user;
    const post = (yield post_1.default.findById(postId)
        .populate("author")
        .populate("likes")
        .exec());
    if (post) {
        // If the user is not the same as the author who made the post(ie. you don't want to get notified for commenting on your own post), create a notification
        if (!post.author._id.equals(user._id)) {
            // If the user has liked the other user's post
            if (post.likes.some((like) => like._id === user._id)) {
                const notification = new notification_1.default({
                    toUser: post.author._id,
                    fromUser: user._id,
                    content: "liked your post",
                });
                yield notification.save();
            }
        }
    }
    next();
}));
exports.send_comment_like_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const user = req.user;
    const comment = (yield comment_1.default.findById(commentId)
        .populate("author")
        .populate("likes")
        .exec());
    // If the user has liked the other user's post
    if (comment.likes.some((like) => like._id === user._id)) {
        // If the user is not the same as the author who made the post(ie. you don't want to get notified for commenting on your own post), create a notification
        if (!comment.author._id.equals(user._id)) {
            const notification = new notification_1.default({
                toUser: comment.author._id,
                fromUser: user._id,
                content: "liked your comment with content",
            });
            yield notification.save();
        }
    }
    next();
}));
exports.send_outgoing_request_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = req.user;
    const otherUser = (yield user_1.default.findById(userId)
        .populate("friendRequests")
        .populate("friendRequests")
        .exec());
    // If the current user has sent an outgoing request to the other user
    if (user.friendRequests.find((friendRequest) => friendRequest.user._id === otherUser._id &&
        friendRequest.status === "outgoing")) {
        const notification = new notification_1.default({
            fromUser: user._id,
            toUser: otherUser._id,
            reference: [otherUser._id, user._id],
            content: "has sent a friend request to you",
        });
        yield notification.save();
    }
    next();
}));
exports.send_rejected_outgoing_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = req.user;
    // If the current user has sent an outgoing request to the other user
    if (user.friendRequests.find((friendRequest) => friendRequest.user._id === user._id &&
        friendRequest.status === "outgoingRejected")) {
        const notification = new notification_1.default({
            fromUser: user._id,
            toUser: userId,
            reference: [userId, user._id],
            content: "has rejected your friend request",
        });
        yield notification.save();
    }
    next();
}));
exports.cancel_send_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // other user
    const userId = req.params.userId;
    const user = req.user;
    yield notification_1.default.findOneAndDelete({
        fromUser: user._id,
        toUser: userId,
        reference: [userId, user._id],
    }).exec();
}));
exports.send_unfriend_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // other user
    const userId = req.params.userId;
    const user = req.user;
    const notification = new notification_1.default({
        fromUser: user._id,
        toUser: userId,
        reference: [userId, user._id],
        content: "has unfriended you"
    });
    yield notification.save();
}));
exports.send_accepted_request_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = req.user;
    if (user.friends.find((friend) => friend._id === user._id)) {
        const notification = new notification_1.default({
            fromUser: user,
            toUser: userId,
            reference: [userId, user._id],
            content: "has accepted your friend request",
        });
        yield notification.save();
    }
    next();
}));

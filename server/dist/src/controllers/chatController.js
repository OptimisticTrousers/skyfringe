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
exports.create_message = exports.get_chat = exports.create_chat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chat_1 = __importDefault(require("../models/chat"));
const express_validator_1 = require("express-validator");
const message_1 = __importDefault(require("../models/message"));
const multer_1 = __importDefault(require("../config/multer"));
const generateAltText_1 = __importDefault(require("../utils/generateAltText"));
const dotenv_1 = require("dotenv");
// Running config for AWS_BUCKET_NAME value
(0, dotenv_1.config)();
// @desc    Get chat
// @route   PUT /users/:userId/friends
// @access  Private
exports.create_chat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const newFriend = req.body.friend;
    const existingChat = (yield chat_1.default.find({
        participants: { $all: [newFriend, user] },
    })
        .populate({
        path: "participants",
        model: "User",
    })
        .populate({
        path: "messages",
        options: {
            sort: { createdAt: 1 },
        },
        model: "Message",
        populate: {
            path: "author",
            model: "User",
        },
    })
        .populate({
        path: "messages",
        model: "Message",
        populate: {
            path: "chat",
            model: "Chat",
        },
    })
        .exec());
    if (existingChat.length === 0) {
        // Else create new chat
        const chat = new chat_1.default({
            participants: [newFriend, user],
            messages: [],
        });
        yield chat.populate("participants");
        yield chat.save();
    }
    // If previous chat exists, don't do anything
}));
// @desc    Get chat
// @route   POST /chat
// @access  Private
exports.get_chat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // Find the chat where both users are participants
    const chat = (yield chat_1.default.findOne({
        participants: { $all: [req.body.user, user] },
    })
        .populate({
        path: "participants",
        model: "User",
    })
        .populate({
        path: "messages",
        options: {
            sort: { createdAt: 1 },
        },
        model: "Message",
        populate: {
            path: "author",
            model: "User",
        },
    })
        .populate({
        path: "messages",
        model: "Message",
        populate: {
            path: "chat",
            model: "Chat",
        },
    })
        .exec());
    if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
    }
    // const projectMessages = chat?.messages?.map((msg: any) => {
    //   const clonedMsg = structuredClone(msg);
    //   clonedMsg.fromSelf = msg.author._id === user._id;
    //   return clonedMsg;
    // });
    // console.log(projectMessages);
    res.status(200).json(chat);
}));
// @desc    Add new messages
// @route   POST /chat/:chatId/messages
// @access  Private
exports.create_message = [
    multer_1.default.single("image"),
    // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
    (0, express_validator_1.body)("content").custom((value, { req }) => {
        if ((!value || value.trim().length === 0) &&
            !req.file &&
            (!req.body.imageUrl || !req.body.altText)) {
            // neither text nor image has been provided
            const error = new Error("Post text or image is required");
            error.status = 400;
            throw error;
        }
        // User has included one of either text or image. Continue with request handling
        return true;
    }),
    // Process request after validation and sanitization
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = req.params.chatId;
        const user = req.user;
        const { content } = req.body;
        const locals = req.locals;
        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }
        // Generate alt text for an image (if an image exists)
        let altText = "";
        const message = new message_1.default({
            content: content && content,
            chat: chatId,
            author: user,
        });
        if (req.body.imageUrl && req.body.altText) {
            message.photo = {
                imageUrl: req.body.imageUrl,
                altText: req.body.altText,
            };
        }
        else if (req.file) {
            // image exists
            const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${user.userName}_${locals.date}.${req.file.mimetype.split("/")[1]}`;
            altText = yield (0, generateAltText_1.default)(imageUrl);
            message.photo = {
                imageUrl,
                altText,
            };
        }
        const chat = (yield chat_1.default.findById(chatId)
            .populate("messages")
            .populate("participants")
            .populate("messages.author")
            .populate("messages.chat")
            .exec());
        chat.messages.push(message);
        yield message.populate("author");
        yield message.populate("chat");
        yield chat.save();
        yield message.save();
        res.status(200).json(message);
    })),
];

import asyncHandler from "express-async-handler";
import Chat from "../models/chat";
import {
  CustomError,
  Locals,
  RequestWithLocals,
  User as IUser,
} from "../../types";
import { body, validationResult } from "express-validator";
import Message from "../models/message";
import upload from "../config/multer";
import generateAltText from "../utils/generateAltText";
import { config } from "dotenv";

// Running config for AWS_BUCKET_NAME value
config();

// @desc    Get chat
// @route   PUT /users/:userId/friends
// @access  Private
export const create_chat = asyncHandler(async (req, res, next) => {
  const user = req.user as IUser;

  const newFriend = req.body.friend;

  const existingChat = (await Chat.find({
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
    .exec()) as any;

  if (existingChat.length === 0) {
    // Else create new chat
    const chat = new Chat({
      participants: [newFriend, user],
      messages: [],
    });

    await chat.populate("participants");

    await chat.save();
  }
  // If previous chat exists, don't do anything
});

// @desc    Get chat
// @route   POST /chat
// @access  Private
export const get_chat = asyncHandler(async (req, res, next) => {
  const user = req.user as IUser;

  // Find the chat where both users are participants
  const chat = (await Chat.findOne({
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
    .exec()) as any;

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
});

// @desc    Add new messages
// @route   POST /chat/:chatId/messages
// @access  Private
export const create_message = [
  upload.single("image"),
  // Check for either post text or image upload to allow a user to post image only or text only, but not a post with neither
  // body("content").custom((value, { req }) => {
  //   if ((!value || value.trim().length === 0) && !req.file) {
  //     // neither text nor image has been provided
  //     const error: CustomError = new Error("Post text or image is required");
  //     error.status = 400;
  //     throw error;
  //   }
  //   // User has included one of either text or image. Continue with request handling
  //   return true;
  // }),
  // Process request after validation and sanitization
  asyncHandler(async (req: RequestWithLocals, res, next) => {
    const chatId = req.params.chatId;
    const user = req.user as IUser;
    const { content } = req.body;
    const locals = req.locals as Locals;

    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    // Generate alt text for an image (if an image exists)
    let altText = "";

    const message = new Message({
      content: content && content,
      chat: chatId,
      author: user,
    });

    if (req.body.imageUrl && req.body.altText) {
      message.photo = {
        imageUrl: req.body.imageUrl,
        altText: req.body.altText,
      };
    } else if (req.file) {
      // image exists
      const imageUrl = `${bucketName}/facebook_clone/${locals.path}/${
        user.userName
      }_${locals.date}.${req.file.mimetype.split("/")[1]}`;
      altText = await generateAltText(imageUrl);
      message.photo = {
        imageUrl,
        altText,
      };
    }

    const chat = (await Chat.findById(chatId)
      .populate("messages")
      .populate("participants")
      .populate("messages.author")
      .populate("messages.chat")
      .exec()) as any;

    chat.messages.push(message);

    await message.populate("author");
    await message.populate("chat");

    await chat.save();

    await message.save();

    res.status(200).json(message);
  }),
];

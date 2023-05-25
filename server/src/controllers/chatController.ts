import asyncHandler from "express-async-handler";
import Chat from "../models/chat";
import { User as IUser } from "../../types";
import { body, validationResult } from "express-validator";
import Message from "../models/message";

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

export const create_message = [
  body("content", "Content is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const chatId = req.params.chatId;
    const user = req.user as IUser;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const message = new Message({
      content: req.body.content,
      chat: chatId,
      author: user,
    });

    await message.populate("author");
    await message.populate("chat");

    await message.save();

    res.status(200).json(message);
  }),
];

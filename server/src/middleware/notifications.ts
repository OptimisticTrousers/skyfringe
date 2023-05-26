import asyncHandler from "express-async-handler";
import Comment from "../models/comment";
import Notification from "../models/notification";
import User from "../models/user";
import Post from "../models/post";
import { Post as IPost, Comment as IComment, User as IUser } from "../../types";
import notification from "../models/notification";

export const send_comment_notification = asyncHandler(
  async (req, res, next) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const user = req.user as IUser;

    const comment = (await Comment.findById(commentId)
      .populate("likes")
      .exec()) as any;

    const post = (await Post.findById(postId)
      .populate("author")
      .exec()) as IPost;

    // If the user is not the same as the author who made the post(ie. you don't want to get notified for commenting on your own post), create a notification
    if (!post.author._id.equals(user._id)) {
      // If the comment actually exists
      if (comment) {
        const notification = new Notification({
          toUser: post.author._id,
          fromUser: user._id,
          content: `commented on your post: "${comment.content}"`,
        });

        await notification.save();
      } else {
        // If the comment does not exist anymore, delete the notification
        await Notification.findOneAndDelete({
          fromUser: user._id,
          toUser: post.author._id,
        }).exec();
      }
    }
    next();
  }
);

export const send_post_like_notification = asyncHandler(
  async (req, res, next) => {
    const postId = req.params.postId;
    const user = req.user as IUser;

    const post = (await Post.findById(postId)
      .populate("author")
      .populate("likes")
      .exec()) as IPost;

    if (post) {
      // If the user is not the same as the author who made the post(ie. you don't want to get notified for commenting on your own post), create a notification
      if (!post.author._id.equals(user._id)) {
        // If the user has liked the other user's post
        if (post.likes.some((like: IUser) => like._id === user._id)) {
          const notification = new Notification({
            toUser: post.author._id,
            fromUser: user._id,
            content: "liked your post",
          });

          await notification.save();
        }
      }
    }
    next();
  }
);

export const send_comment_like_notification = asyncHandler(
  async (req, res, next) => {
    const commentId = req.params.commentId;
    const user = req.user as IUser;

    const comment = (await Comment.findById(commentId)
      .populate("author")
      .populate("likes")
      .exec()) as IComment;

    // If the user has liked the other user's post
    if (comment.likes.some((like: IUser) => like._id === user._id)) {
      // If the user is not the same as the author who made the post(ie. you don't want to get notified for commenting on your own post), create a notification
      if (!comment.author._id.equals(user._id)) {
        const notification = new Notification({
          toUser: comment.author._id,
          fromUser: user._id,
          content: "liked your comment with content",
        });

        await notification.save();
      }
    }
    next();
  }
);

export const send_outgoing_request_notification = asyncHandler(
  async (req, res, next) => {
    const userId = req.params.userId;
    const user = req.user as IUser;

    const otherUser = (await User.findById(userId)
      .populate("friendRequests")
      .populate("friendRequests")
      .exec()) as IUser;

    // If the current user has sent an outgoing request to the other user
    if (
      user.friendRequests.find(
        (friendRequest: any) =>
          friendRequest.user._id === otherUser._id &&
          friendRequest.status === "outgoing"
      )
    ) {
      const notification = new Notification({
        fromUser: user._id,
        toUser: otherUser._id,
        reference: [otherUser._id, user._id],
        content: "has sent a friend request to you",
      });

      await notification.save();
    }
    next();
  }
);

export const send_rejected_outgoing_notification = asyncHandler(
  async (req, res, next) => {
    const userId = req.params.userId;
    const user = req.user as IUser;

    // If the current user has sent an outgoing request to the other user
    if (
      user.friendRequests.find(
        (friendRequest: any) =>
          friendRequest.user._id === user._id &&
          friendRequest.status === "outgoingRejected"
      )
    ) {
      const notification = new Notification({
        fromUser: user._id,
        toUser: userId,
        reference: [userId, user._id],
        content: "has rejected your friend request",
      });

      await notification.save();
    }

    next();
  }
);

export const cancel_send_notification = asyncHandler(async (req, res, next) => {
  // other user
  const userId = req.params.userId;
  const user = req.user as IUser;
  await Notification.findOneAndDelete({
    fromUser: user._id,
    toUser: userId,
    reference: [userId, user._id],
  }).exec();
});

export const send_unfriend_notification = asyncHandler(
  async (req, res, next) => {
    // other user
    const userId = req.params.userId;
    const user = req.user as IUser;
    const notification = new Notification({
      fromUser: user._id,
      toUser: userId,
      reference: [userId, user._id],
      content: "has unfriended you"
    });

    await notification.save();
  }
);

export const send_accepted_request_notification = asyncHandler(
  async (req, res, next) => {
    const userId = req.params.userId;
    const user = req.user as IUser;

    if (user.friends.find((friend: any) => friend._id === user._id)) {
      const notification = new Notification({
        fromUser: user,
        toUser: userId,
        reference: [userId, user._id],
        content: "has accepted your friend request",
      });
      await notification.save();
    }
    next();
  }
);

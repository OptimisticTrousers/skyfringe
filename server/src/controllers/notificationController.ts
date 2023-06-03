import asyncHandler from "express-async-handler";
import Notification from "../models/notification";
import { User as IUser } from "../../types";

// @desc    Get all user notifications
// @route   GET /api/users/:userId/notifications
// @access  Private
export const get_notifications = asyncHandler(async (req, res, next) => {
  const user = req.user as IUser;
  const notifications = await Notification.find({ toUser: user._id })
    .populate("toUser")
    .populate("fromUser")
    .populate("reference")
    .exec();

  res.status(200).json(notifications);
});

// @desc    Delete user notification
// @route   DELETE /api/users/:userId/notifications/:notificationId
// @access  Private
export const read_notification = asyncHandler(async (req, res, next) => {
  const user = req.user as IUser;
  const deletedNotification = await Notification.deleteOne({
    toUser: user._id,
  });

  res.status(200).json(deletedNotification);
});

// @desc    Delete all user notifications
// @route   DELETE /api/users/:userId/notifications
// @access  Private
export const read_all_notifications = asyncHandler(async (req, res, next) => {
  const user = req.user as IUser;
  const deletedNotifications = await Notification.deleteMany({
    toUser: user._id,
  })
    .populate("toUser")
    .populate("fromUser")
    .populate("reference")
    .exec();

  res.status(200).json(deletedNotifications);
});

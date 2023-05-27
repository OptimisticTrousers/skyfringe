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
exports.read_all_notifications = exports.read_notification = exports.get_notifications = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notification_1 = __importDefault(require("../models/notification"));
// @desc    Get all user notifications (public details)
// @route   GET /api/users/:userId/notifications
// @access  Private
exports.get_notifications = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const notifications = yield notification_1.default.find({ toUser: user._id })
        .populate("toUser")
        .populate("fromUser")
        .populate("reference")
        .exec();
    res.status(200).json(notifications);
}));
// @desc    Delete user notification
// @route   DELETE /api/users/:userId/notifications/:notificationId
// @access  Private
exports.read_notification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const deletedNotification = yield notification_1.default.deleteOne({
        toUser: user._id,
    });
    res.status(200).json(deletedNotification);
}));
// @desc    Delete user notification
// @route   DELETE /api/users/:userId/notifications
// @access  Private
exports.read_all_notifications = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const deletedNotifications = yield notification_1.default.deleteMany({
        toUser: user._id,
    })
        .populate("toUser")
        .populate("fromUser")
        .populate("reference")
        .exec();
    res.status(200).json(deletedNotifications);
}));

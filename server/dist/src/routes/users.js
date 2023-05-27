"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const multerCoverKey_1 = __importDefault(require("../middleware/multerCoverKey"));
const validateUserId_1 = __importDefault(require("../middleware/validateUserId"));
const multerUserKey_1 = __importDefault(require("../middleware/multerUserKey"));
const restrictTestUserActions_1 = __importDefault(require("../middleware/restrictTestUserActions"));
const notificationController_1 = require("../controllers/notificationController");
const router = (0, express_1.Router)();
router.route("/").get(userController_1.user_list);
router
    .route("/:userId")
    .get(validateUserId_1.default, userController_1.user_detail)
    .put(validateUserId_1.default, restrictTestUserActions_1.default, userController_1.user_update)
    .delete(validateUserId_1.default, restrictTestUserActions_1.default, userController_1.user_delete);
router.route("/:userId/images").get(validateUserId_1.default, userController_1.user_images);
router.route("/:userId/chats").get(validateUserId_1.default, userController_1.get_user_chats);
router
    .route("/:userId/notifications")
    .get(notificationController_1.get_notifications)
    .delete(notificationController_1.read_all_notifications);
router
    .route("/:userId/notifications/:notificationId")
    .delete(notificationController_1.read_notification);
router
    .route("/:userId/avatar")
    .put(validateUserId_1.default, restrictTestUserActions_1.default, multerUserKey_1.default, userController_1.user_avatar_put);
router
    .route("/:userId/cover")
    .put(validateUserId_1.default, restrictTestUserActions_1.default, multerCoverKey_1.default, userController_1.user_cover_put);
router.route("/:userId/feed").get(validateUserId_1.default, userController_1.user_feed);
exports.default = router;

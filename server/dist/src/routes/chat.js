"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const multerMessageKey_1 = __importDefault(require("../middleware/multerMessageKey"));
const router = (0, express_1.Router)();
router.route("/").post(chatController_1.get_chat);
router.route("/:chatId/messages").post(multerMessageKey_1.default, chatController_1.create_message);
exports.default = router;

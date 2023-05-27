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
const mongoose_1 = __importDefault(require("mongoose"));
const post_1 = __importDefault(require("../models/post"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatePostId = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    if (!mongoose_1.default.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: "Invalid post ID" });
        return;
    }
    const post = yield post_1.default.findById(req.params.postId);
    if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
    }
    next();
}));
exports.default = validatePostId;

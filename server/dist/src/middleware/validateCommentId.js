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
const comment_1 = __importDefault(require("../models/comment"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validateCommentId = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    if (!mongoose_1.default.Types.ObjectId.isValid(commentId)) {
        res.status(400).json({ message: "Invalid comment ID" });
        return;
    }
    const comment = yield comment_1.default.findById(req.params.commentId);
    if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
    }
    next();
}));
exports.default = validateCommentId;

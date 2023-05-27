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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_1 = __importDefault(require("../models/post"));
const multerPostKey = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = (yield post_1.default.findById(req.params.postId).exec());
    req.locals = {
        path: "posts",
    };
    if (post && post.photo && post.photo.imageUrl) {
        const imageUrl = post.photo.imageUrl;
        req.locals.date = imageUrl.substring(imageUrl.lastIndexOf("/") + 1, imageUrl.lastIndexOf("_"));
    }
    else {
        req.locals.date = Date.now().toString();
    }
    next();
}));
exports.default = multerPostKey;

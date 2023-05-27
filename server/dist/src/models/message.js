"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    content: { type: String },
    chat: { type: mongoose_1.Schema.Types.ObjectId, ref: "Chat", required: true },
    photo: {
        imageUrl: { type: String },
        altText: { type: String },
    },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Message", MessageSchema);

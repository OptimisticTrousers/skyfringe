"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message", default: [] }],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Chat", ChatSchema);

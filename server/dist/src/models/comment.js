"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, minLength: 1, required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
CommentSchema.virtual("likeCount").get(function () {
    if (!this.likes) {
        return 0;
    }
    return this.likes.length;
});
exports.default = (0, mongoose_1.model)("Comment", CommentSchema);

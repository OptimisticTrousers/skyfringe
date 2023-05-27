"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    photo: {
        imageUrl: { type: String },
        altText: { type: String },
    },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
PostSchema.virtual("likeCount").get(function () {
    if (!this.likes) {
        return 0;
    }
    return this.likes.length;
});
exports.default = (0, mongoose_1.model)("Post", PostSchema);

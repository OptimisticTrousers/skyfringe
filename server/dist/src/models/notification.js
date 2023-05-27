"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    fromUser: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    toUser: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String },
    reference: { type: mongoose_1.Schema.Types.Mixed, required: true },
    photo: {
        imageUrl: { type: String },
        altText: { type: String },
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Notification", NotificationSchema);

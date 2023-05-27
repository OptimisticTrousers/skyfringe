"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    facebookId: { type: String },
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 8 },
    bio: { type: String },
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    friendRequests: {
        type: [
            {
                user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
                status: {
                    type: String,
                    enum: [
                        "outgoing",
                        "incoming",
                        "outgoingRejected",
                        "rejectedIncoming",
                    ],
                },
            },
        ],
        default: [],
    },
    photo: {
        imageUrl: { type: String },
        altText: { type: String },
    },
    cover: {
        imageUrl: { type: String },
        altText: { type: String },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            // Delete password for security reasons so that the client doesn't have access to the password field
            delete ret.password;
        },
    },
    toObject: { virtuals: true },
});
// Virtual for user's URL
UserSchema.virtual("url").get(function () {
    return `/users/${this.userName}`;
});
UserSchema.virtual("friendCount").get(function () {
    // Don't return a number if the user does not have friends. This is used for projection operation queries.
    if (!this.friends) {
        return;
    }
    return this.friends.length;
});
exports.default = (0, mongoose_1.model)("User", UserSchema);

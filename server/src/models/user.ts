import { Schema, model } from "mongoose";
import { User } from "../../types";

const UserSchema = new Schema(
  {
    facebookId: { type: String },
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 8 },
    bio: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    friendRequests: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: "User" },
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret: User) {
        delete ret.password;
      },
    },
    toObject: { virtuals: true },
  }
);

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

export default model<User>("User", UserSchema);

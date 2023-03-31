import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    facebookId: { type: String },
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 8 },
    bio: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: [
            "outgoing",
            "incoming",
            "rejectedOutgoing",
            "rejectedIncoming",
          ],
        },
      },
    ],
    photo: {
      imageUrl: { type: String },
      altText: { type: String },
    },
    cover: {
      imageUrl: { type: String },
      altText: { type: String },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
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

export default mongoose.model("User", UserSchema);

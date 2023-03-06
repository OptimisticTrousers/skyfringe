import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 8 },
    bio: { type: String },
    friends: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: [
            "friend",
            "outgoingFriendRequest",
            "incomingFriendRequest",
            "rejectedFriendRequest",
          ],
        },
      },
    ],
    photo: {
      imageUrl: String,
      altText: String,
    },
    cover: {
      imageUrl: String,
      altText: String,
    },
  },
  { timestamps: true }
);

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/users/${this.userName}`;
});

UserSchema.virtual("friendCount").get(function () {
  // Don't return a number if the user does not have friends. This is used for projection operationq queries.
  if (!this.friends) {
    return;
  }

  if (this.friends.length !== 0) {
    return this.friends.filter((friend) => friend.status === "friend").length;
  } else {
    return 0;
  }
});

export default mongoose.model("User", UserSchema);

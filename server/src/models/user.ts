import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 8 },
    // friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // photo: {
    //   photoId: String,
    //   imageUrl: String,
    //   altText: String,
    // },
    // cover: {
    //   photoId: String,
    //   imageUrl: String,
    //   altText: String,

    // },
    // outgoingFriendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // incomingFriendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

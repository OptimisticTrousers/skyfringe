import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    picture: { type: Map },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    replies: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);

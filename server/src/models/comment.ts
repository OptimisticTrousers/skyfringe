import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

CommentSchema.virtual("likeCount").get(function () {
  if (!this.likes) {
    return 0;
  }
  return this.likes.length;
});

export default mongoose.model("Comment", CommentSchema);

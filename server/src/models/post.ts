import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, minLength: 4, maxLength: 1000 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    photo: {
      imageUrl: String,
      altText: String,
    },
  },
  { timestamps: true }
);

PostSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

PostSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

export default mongoose.model("Post", PostSchema);

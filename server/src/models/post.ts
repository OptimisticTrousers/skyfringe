import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, minLength: 4, maxLength: 1000 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    photo: {
      imageUrl: { type: String },
      altText: { type: String },
    },
  },
  { timestamps: true, toObject: { virtuals: true } }
);

PostSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

export default mongoose.model("Post", PostSchema);

import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    content: { type: String },
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    photo: {
      imageUrl: { type: String },
      altText: { type: String },
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Message", MessageSchema);

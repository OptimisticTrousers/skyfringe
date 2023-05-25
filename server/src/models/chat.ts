import { Schema, model } from "mongoose";

const ChatSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: [] }],
  },
  {
    timestamps: true,
  }
);

export default model("Chat", ChatSchema);

import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String },
    reference: { type: Schema.Types.Mixed, required: true },
    photo: {
      imageUrl: { type: String },
      altText: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export default model<any>("Notification", NotificationSchema);

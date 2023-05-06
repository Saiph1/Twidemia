// Purpose: Chat MongoDB Schema

import mongoose, { Schema } from "mongoose";
const ChatSchema = new mongoose.Schema({
  message: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

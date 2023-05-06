// Purpose: Comment MongoDB Schema

import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tweet: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
    required: true,
  },

  postDateTime: {
    type: Date,
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

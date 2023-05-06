// Purpose: Tweet MongoDB Schema

import mongoose, { Schema } from "mongoose";

const TweetSchema = new mongoose.Schema({
  tweetID: {
    type: Number,
    required: true,
    unique: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  visibility: {
    type: Number,
    required: true,
  },
  likers: [
    {
      type: String,
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);

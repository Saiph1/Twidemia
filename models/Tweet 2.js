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
  postdate: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    required: true,
  },
  likers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
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
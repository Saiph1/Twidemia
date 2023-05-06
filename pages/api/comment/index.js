// Purpose: API for commenting post

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Tweet from "../../../models/Tweet";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // // console.log({session});

  // if (!session) {
  //     return res.status(401).json({error: "Please login first."});
  // }

  const { method } = req;

  // Connect DB.
  await dbConnect();

  // Check req method.
  switch (method) {
    // Create a new comment.
    case "POST":
      try {
        // Find if current logged-in user is existed and its ID.
        // const user = await User.findOne({username: session.user.username});
        const user = await User.findOne({ userId: req.body.userId });
        console.log("foudned user", user);
        if (!user) res.status(500).json({ error: "User not found." });
        const tweet2 = await Tweet.findOne({ tweetID: req.body.postId });

        // Construct a comment object.
        const data = {
          content: req.body.content,
          author: user._id,
          postDateTime: Date.now(),
          tweet: tweet2._id,
          // date: date.toLocaleString('en-US', {timeZone})
        };

        // Create the comment, return the created comment.
        const comment = await Comment.create(data);

        const tweet = await Tweet.findOne({ tweetID: req.body.postId });
        console.log("foudned tweet", tweet);
        tweet.comments.addToSet(comment._id);
        tweet.save();
        if (!tweet) res.status(500).json({ error: "Tweet not found." });

        res.status(201).json(comment);
        console.log(comment);
      } catch (error) {
        // Return 500 if failed.
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;

    default:
      res.status(404).json({ error: "Not found." });
      break;
  }
}

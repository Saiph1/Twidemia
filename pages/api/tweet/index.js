import dbConnect from "../../../lib/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const tweets = await Tweet.find({}); //.populate("followerlist");
        res.status(200).json({ success: true, data: tweets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // Post tweet
    case "POST":
      try {
        var body = JSON.parse(req.body);
        var creator = await User.findOne({ userId: body.creator });
        var tweets = await Tweet.find({});
        const tweet = new Tweet({
          content: body.content,
          date: Date.now(),
          visibility: body.vis,
          tweetID: tweets.length + 1,
          userID: creator._id,
          likers: [],
          comments: [],
        });

        tweet.save();
        creator.tweetlist.addToSet(tweet._id);
        creator.save();
        res.status(201).json({ success: true, data: tweet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

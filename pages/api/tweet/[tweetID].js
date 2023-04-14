import dbConnect from "../../../lib/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";
import Comment from "../../../models/Comment";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        var tweet = await Tweet.findOne({ tweetID: req.query.tweetID })
          .populate("userID")
          .populate([{ path: "comments", populate: { path: "author" } }]);
        // let arr = [];
        // for (let i = 0; i < tweet.comments.length; i++)
        //   var comment = await Comment.findOne({_id: tweet.comments[0]._id});
        //   arr=[...arr, comment];
        // console.log("tweet data",tweet);
        var comment = await Comment.find({ tweet: tweet._id }).populate(
          "author"
        );

        res
          .status(201)
          .json({ success: true, data: { tweet: tweet, comment: comment } });
      } catch (error) {
        res.status(400).json({ success: false, error: error.toString() });
      }
      break;
    // retweet.
    case "POST":
      try {
        var body = req.body;

        var retweeter = await User.findOne({ userId: body.viewer.userId });
        var tweet = await Tweet.find({ tweetID: req.query.tweetID });
        if (body.retweet) retweeter.tweetlist.addToSet(tweet[0]._id);
        else retweeter.tweetlist.pull(tweet[0]._id);
        retweeter.save();
        res.status(201).json({ success: true, data: retweeter });
      } catch (error) {
        res.status(400).json({ success: false, error: error.toString() });
      }
      break;

    case "PUT":
      try {
        const tweet = await Tweet.findOne({ tweetID: req.body.tweetID });
        if (tweet.likers.includes(req.body.liker)) {
          tweet.likers.pull(req.body.liker);
        } else {
          tweet.likers.addToSet(req.body.liker);
        }
        await tweet.save();
        res.status(200).json({ ok: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

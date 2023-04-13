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
        var tweet = await Tweet.findOne({ tweetID: req.query.tweetID }).populate("userID");
        res.status(201).json({ success: true, data: tweet });
      } catch (error) {
        res.status(400).json({ success: false, error: error.toString()});
      }
      break;
    // retweet.
    case "POST":
      try {
        var body = req.body;
        
        var retweeter = await User.findOne({ userId: body.viewer.userId });
        var tweet = await Tweet.find({tweetID: req.query.tweetID});
        if (body.retweet)
          retweeter.tweetlist.addToSet(tweet[0]._id); 
        else retweeter.tweetlist.pull(tweet[0]._id); 
        retweeter.save(); 
        res.status(201).json({ success: true, data: retweeter });
      } catch (error) {
        res.status(400).json({ success: false, error: error.toString()});
      }
      break;

    case "PUT":
      try {
        const tweet = await Tweet.findOne({ tweetID: req.body.tweetID });
        if (tweet.likers.includes(req.body.liker)){
          tweet.likers.pull(req.body.liker);
        }
        else{
          tweet.likers.addToSet(req.body.liker);
        }
        await tweet.save();
        res.status(200).json({ ok: true });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
      break;
      default:
        res.status(400).json({ success: false });
        break;
  }
}

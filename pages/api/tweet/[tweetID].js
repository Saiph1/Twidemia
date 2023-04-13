import dbConnect from "../../../lib/dbConnect";
import Tweet from "../../../models/Tweet";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
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

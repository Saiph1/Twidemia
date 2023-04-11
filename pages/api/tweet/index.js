import dbConnect from "../../../lib/dbConnect";
import Tweet from "../../../models/Tweet";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try { 
        const tweets = await Tweet.find({})//.populate("followerlist");
        res.status(200).json({ success: true, data: tweets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // This is used for testing purpose for now.
        const tweet = new Tweet({
          tweet_ID: 10,
          content: "test",
          date: 123,
          visibility: "self"
        });
        tweet.save();
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

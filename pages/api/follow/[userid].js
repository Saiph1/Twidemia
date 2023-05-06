// Purpose: API for following and unfollowing users

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const user = await User.findOne({ userId: req.query.userid });
        const follow = await User.findOne({ userId: req.body.userId });
        user.followinglist.addToSet(follow._id);
        follow.followerlist.addToSet(user._id);
        user.save();
        follow.save();
        res.status(201).json({ success: true, data: follow });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const user = await User.findOne({ userId: req.query.userid });
        const follow = await User.findOne({ userId: req.body.userId });
        user.followinglist.pull(follow._id);
        follow.followerlist.pull(user._id);
        user.save();
        follow.save();
        res.status(201).json({ success: true, data: follow });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

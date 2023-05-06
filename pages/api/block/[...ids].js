// Purpose: API for blocking and unblocking users

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Message from "../../../models/Message";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const user1 = await User.findOne({ userId: req.query.ids[0] });
        const user2 = await User.findOne({ userId: req.query.ids[1] });
        user1.blocklist.addToSet(user2._id);
        user2.blocklist.addToSet(user1._id);
        user1.save();
        user2.save();
        res.status(201).json({ success: true, data: [user1, user2] });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const user1 = await User.findOne({ userId: req.query.ids[0] });
        const user2 = await User.findOne({ userId: req.query.ids[1] });
        user1.blocklist.pull(user2._id);
        user2.blocklist.pull(user1._id);
        user1.save();
        user2.save();
        res.status(201).json({ success: true, data: [user1, user2] });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

// Purpose: API for retrieving the follower and block list

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Image from "../../../models/Image";
// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let users;
        if (query.fast) {
          users = await User.find({})
            .populate("followerlist")
            .populate("blocklist");
        } else {
          users = await User.find({})
            .populate("followerlist")
            .populate("blocklist")
            .populate("avatar");
        }
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // This is used for testing purpose for now.
        const user = new User({
          username: "newuser",
          email: "newuser@gmail.com",
          userId: "newuser",
          password: "newuser",
          admin: false,
          faculty: "Faculty of Engineering",
          year: 2,
        });
        user.save();
        // const img = new Image({
        //   content:"",
        // })
        // img.save();
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

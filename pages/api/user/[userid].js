// Purpose: API for retrieving users (GET), updating users (PUT), and deleting users (DELETE) according to the query userId

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Image from "../../../models/Image";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        await User.deleteOne({ userId: req.query.userid });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    case "GET":
      try {
        const users = await User.findOne({ userId: req.query.userid })
          .populate("followerlist")
          .populate("followinglist")
          .populate("blocklist")
          .populate("avatar")
          .populate("background")
          .populate([
            {
              path: "tweetlist",
              populate: { path: "userID", populate: { path: "avatar" } },
            },
          ]);
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;

    case "PUT":
      let updateUser = req.body;
      console.log(updateUser);
      try {
        const user = await User.findOne({ userId: req.query.userid });
        // When user exist, update user info
        if (user) {
          // console.log(user);

          // // Find the user in the user database first.
          // let user = await User.findOne({_id: req.query.userid});
          // if (!user) {
          //   res.status(404).json({error: "User not found"});
          // }

          // Update user
          // Update the event information.
          if (updateUser.username) user.username = updateUser.username;
          if (updateUser.year) user.year = updateUser.year;
          if (updateUser.description) user.Description = updateUser.description;
          if (updateUser.facultyValue) user.faculty = updateUser.facultyValue;
          if (updateUser.password) user.password = updateUser.password;
          if (updateUser.verified) user.verified = updateUser.verified;
          if (updateUser.avatar) {
            const image_new = new Image({
              content: updateUser.avatar,
              user: user._id,
            });
            image_new.save();
            user.avatar = [];
            user.avatar.addToSet(image_new);
          }
          if (updateUser.background) {
            const image_new = new Image({
              content: updateUser.background,
              user: user._id,
            });
            image_new.save();
            user.background = [];
            user.background.addToSet(image_new);
          }
          // Save and return.
          await user.save();
          res.status(200).json({ success: true, data: user });
        } else res.status(404).json({ error: error.toString() });
      } catch (error) {
        //Return 500 if unsuccessful.
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;
  }
}

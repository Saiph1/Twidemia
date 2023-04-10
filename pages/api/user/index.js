import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({}).populate("followerlist");
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // This is used for testing purpose for now.
        const user = new User({
          username: "Apr5_test",
          email: "Apr5_test@gmail.com",
          userId: "test",
          password: "test",
          admin: false,
          faculty: "Faculty of Engineering",
          year: 2,
        });
        user.save();
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

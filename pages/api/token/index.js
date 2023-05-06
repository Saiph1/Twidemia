import dbConnect from "../../../lib/dbConnect";
import sendToken from "../../../lib/email";
import Token from "../../../models/Token";
import User from "../../../models/User";
import crypto from "crypto";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
      // create new token, given email / userId, type
    case "POST":
      try {
        console.log(req.body);
        const { email, userId, type } = req.body;
        let user = null;
        if (email) user = await User.findOne({ email: email });
        else user = await User.findOne({ userId: userId });
        if (!user) {
          res.status(200).json({
            success: false,
            message: "User does not exists",
          });
          return;
        }
        // randomize token string and save to db
        const hash = crypto.randomBytes(16).toString("hex");
        const token = new Token({
          userId: user.userId,
          email: user.email,
          type: type,
          hash: hash,
        });
        console.log(hash);
        token.save();
        await sendToken({ token });
        res.status(201).json({ success: true, token: token });
      } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

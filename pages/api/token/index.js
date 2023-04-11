import dbConnect from "../../../lib/dbConnect";
import sendToken from "../../../lib/email";
import Token from "../../../models/Token";
import User from "../../../models/Token";
import bcrypt from "bcrypt"

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const {email, type} = req.body;
      if (type == "forgot") {
        const existUser = await User.exists({email: email});
        /*
        if (!existUser) {
          res.status(200).json({
            success: false,
            message: "User not registered",
          });
          return;
        }
        */
        const hash = await bcrypt.genSalt(10);
        console.log(hash)
        const token = new Token({
          email: email,
          type: type,
          hash: hash
        });
        token.save()
        await sendToken({token})
        res.status(201).json({success:true});
      }

      } catch (error) {
        console.error(error.message)
        res.status(400).json({success: false, message:error.message});
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

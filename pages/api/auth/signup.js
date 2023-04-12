import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  await dbConnect();
  try {
    const existUser = await User.exists({ email: email });
    if (existUser) {
      res.status(200).json({
        user: null,
        message: `Email registered already!`,
      });
      return;
    }
    /*
    existUser = await User.exists({ userId: userId });
    if (existUser) {
      res.status(200).json({
        user: null,
        message: `Email registered already!`,
      });
      return;
    }
    */
    const user = new User({
      email: email,
      password: password,
    });
    user.save();
    res.status(201).json({
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      user: null,
      message: error.message,
    });
  }
}

export default handler;

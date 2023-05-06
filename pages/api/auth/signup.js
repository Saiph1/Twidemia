import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password, userId, username, year, faculty } = data;

  await dbConnect();
  try {
    // check email registered or not
    const existUser = await User.exists({ email: email });
    if (existUser) {
      res.status(200).json({
        user: null,
        message: `Email registered already!`,
      });
      return;
    }

    // create new user and save to db
    let user = new User({
      email: email,
      password: password,
      userId: userId,
      username: username,
      faculty: faculty,
      year: year,
    });
    user = await user.save();
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

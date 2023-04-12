import dbConnect from "./dbConnect";
import User from "./../models/User.js";
import bcrypt from "bcrypt";

// check password, return null if email/uid not exists or password doesnt match
// (reason why authenticaiton failed is not shown for security reason)
// if credential is correct, return info userful for setting session
async function checkCredentials({ email_uid, password }) {
  /*
  if (email_uid === password) {
    return {
      username: "test_user",
      userId: "test_user",
      admin: false,
      verified: true,
    };
  }
  */

  await dbConnect();

  // find user by uid or email
  const user = await User.findOne({
    $or: [{ userId: email_uid }, { email: email_uid }],
  });
  if (user) {
    const same = await bcrypt.compare(password, user.password);
    if (same) {
      return {
        username: user.username,
        userId: user.userId,
        admin: user.admin,
        verified: user.verified,
      };
    } else return null;
  } else {
    return null;
  }
}

export default checkCredentials;

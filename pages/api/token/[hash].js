import dbConnect from "../../../lib/dbConnect";
import Token from "../../../models/Token";


export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
      // check if token exists in db
    case "GET":
      try {
        const { hash } = req.query;
        const existToken = await Token.exists({ hash: hash });
        if (!existToken) {
          res.status(200).json({
            success: false,
          });
          return;
        }
        const token = await Token.findOne({ hash: hash });
        console.log(token);
        res.status(200).json({ success: true, token: token });
      } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      // delete token
    case "DELETE":
      const { hash } = req.query;
      try {
        await Token.deleteOne({ _id: hash });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

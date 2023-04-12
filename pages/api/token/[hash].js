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
    case "GET":
      try {
        const {hash} = req.query;
        const existToken = await Token.exists({hash: hash});
        if (!existToken) {
          res.status(200).json({
            success: false, 
          })
        };
        const token = await Token.findOne({hash:hash});
        console.log(token)
        res.status(200).json({success:true})

      }
      catch (error){
        console.error(error.message)
        res.status(400).json({success: false, message:error.message});
      }
      break;
    case "DELETE":
      const {hash} = req.query;
      try {
        await Token.deleteOne({_id: hash})
        res.status(200).json({success: true})

      }catch (error) {
        res.status(400).json({success:false, message:error.message});
      }
    break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

import dbConnect from "../../../lib/dbConnect";
// import Chat from "./models/Chat";
import Chat from "../../../models/chat";
import User from "../../../models/User";
import Message from "../../../models/Message";

// https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user1 = await User.findOne({ userId: req.query.ids[0] });
        const user2 = await User.findOne({ userId: req.query.ids[1] });
        // const chat = await Chat.findOne({ sender: user1._id, receiver: user2._id }).populate("message").populate([{path: 'message', populate: {path: 'sender'}}]);
        const chat = await Chat.findOne({
          sender: user1._id,
          receiver: user2._id,
        }).populate([{ path: "message", populate: { path: "sender" } }]);
        res
          .status(201)
          .json({ success: true, data: !chat ? { message: [] } : chat });
      } catch (error) {
        res.status(400).json({ success: false, data: { message: [] } });
      }
      break;
    // case "PUT":
    //   try {
    //     // const user = await User.findOne({ userId: req.query.userid });
    //     // const follow = await User.findOne({ userId: req.body.userId });
    //     // user.followinglist.addToSet(follow._id);
    //     // follow.followerlist.addToSet(user._id);
    //     // user.save();
    //     // follow.save();
    //     // res.status(201).json({ success: true, data: follow });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;

    case "POST":
      try {
        const user1 = await User.findOne({ userId: req.query.ids[0] });
        const user2 = await User.findOne({ userId: req.query.ids[1] });
        const existed_chat1 = await Chat.findOne({
          sender: user1._id,
          receiver: user2._id,
        });
        const existed_chat2 = await Chat.findOne({
          sender: user2._id,
          receiver: user1._id,
        });
        const message_new = new Message({
          content: req.body.content,
          sender: user1._id,
          receiver: user2._id,
        });
        message_new.save();
        if (!existed_chat1) {
          const chat_new1 = new Chat({
            sender: user1._id,
            receiver: user2._id,
            message: message_new,
          });
          chat_new1.save();
          const chat_new2 = new Chat({
            sender: user2._id,
            receiver: user1._id,
            message: message_new,
          });
          chat_new2.save();
        } else {
          existed_chat1.message.addToSet(message_new);
          existed_chat2.message.addToSet(message_new);
          existed_chat1.save();
          existed_chat2.save();
        }

        res.status(201).json({ success: true, data: message_new });
      } catch (error) {
        res.status(400).json({ success: false, error: error.toString() });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

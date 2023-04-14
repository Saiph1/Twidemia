import React, { useState } from "react";
// import { BsEmojiSmileFill } from "react-icons/bs";
// import { IoMdSend } from "react-icons/io";
// import styled from "styled-components";
// import Picker from "emoji-picker-react";
import Button from "@mui/material/Button";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  //   const handleEmojiPickerhideShow = () => {
  //     setShowEmojiPicker(!showEmojiPicker);
  //   };

  //   const handleEmojiClick = (event, emojiObject) => {
  //     let message = msg;
  //     message += emojiObject.emoji;
  //     setMsg(message);
  //   };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="py-2 md:py-4 px-4  border-t border-neutral-100">
      <div className="button-container">
        {/* <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div> */}
      </div>
      <form
        className="input-container border border-neutral-400 py-2 px-4 rounded-full w-full flex items-center justify-between"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="Type your message here.."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="focus:outline-none bg-transparent pl-2 w-full"
        />

        <button
          type="submit"
          className="text-primary-blue font-semibold hover:bg-blue-200 rounded-lg px-2 py-1"
        >
          Send
        </button>

        {/* <Button 
            disableRipple
            // class="sm-white hover:bg-gray-100 text-blue-500 py-2 px-4 mx-4 border border-gray-300 rounded shadow " 
            size="small" 
            >
              Send
        </Button> */}
      </form>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
import ChatInput from "./ChatInput";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import Typography from "@mui/material/Typography";
// import io from 'Socket.IO-client'
import { io } from "socket.io-client";

export default function ChatContainer({ currentChat, viewer=""}) {
  const [messages, setMessages] = useState([]);
  // const scrollRef = useRef();
  // const [input, setInput] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [update_done, setupdate_done] = useState(false); 
  const [load, setload] = useState(false);

  let socket=io();
  useEffect(() => {
    socketInitializer();
    // setupdate_done(true);
  }, [])
  
  const socketInitializer = async () => {
    await fetch('/api/socket');
    console.log(viewer);
    console.log(currentChat.userId);
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      setMessages((prevMessages)=>[...prevMessages, msg]);
      console.log(messages);
    })
  }

  useEffect(()=>{
    setload(false);
    fetch("/api/Chat/"+viewer+"/"+currentChat.userId)
    .then((res)=>res.json())
    .then((data)=>{
      console.log("data",data);
      setMessages([]);
        for (let i=0; i<data.data.message.length; i++)
          setMessages((prevMessages)=>[...prevMessages, data.data.message[i].content+"(from ID=@"+data.data.message[i].sender.userId+")"]);
    }).then(()=>setload(true));
  }, [currentChat])

//   useEffect(async () => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     const response = await axios.post(recieveMessageRoute, {
//       from: data._id,
//       to: currentChat._id,
//     });
//     setMessages(response.data);
//   }, [currentChat]);

//   useEffect(() => {
//     const getCurrentChat = async () => {
//       if (currentChat) {
//         await JSON.parse(
//           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//         )._id;
//       }
//     };
//     getCurrentChat();
//   }, [currentChat]);

    const handleSendMsg = async (msg) => {
      console.log(msg); 
      fetch("/api/Chat/"+viewer+"/"+currentChat.userId, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: msg})
    }).then((obj)=>obj.json())
    .then((data)=>{console.log("post done."); console.log(data);})
      socket.emit('input-change', msg);
    };
//   const handleSendMsg = async (msg) => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     socket.current.emit("send-msg", {
//       to: currentChat._id,
//       from: data._id,
//       msg,
//     });
//     await axios.post(sendMessageRoute, {
//       from: data._id,
//       to: currentChat._id,
//       message: msg,
//     });

//     const msgs = [...messages];
//     msgs.push({ fromSelf: true, message: msg });
//     setMessages(msgs);
//   };

//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("msg-recieve", (msg) => {
//         setArrivalMessage({ fromSelf: false, message: msg });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

  return (
    <div className="w-full">
        <div className="chat-header">
            <div className="user-details">
                <div className="username border-b-[2px] flex items-center">
                    <img src="123" />
                    <p className="py-3 px-6 font-semibold">{currentChat.username}</p>
                </div>
            </div>
        </div>
    
        <div className="flex flex-col h-full">
          {(!load)? 
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
          :<div className="chat-messages px-6 overflow-y-scroll h-auto bg-gray-400">
              {messages.map((message) => {
              return (
                  <div key={message}>
                      <div className="content h-[200px]">
                          <p>{message}</p>
                      </div>
                  </div>
                );
              })}
          </div>}
          
          <ChatInput handleSendMsg={handleSendMsg}/>
        </div>
    </div>
  );
}

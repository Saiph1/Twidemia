import React, { useEffect, useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";
import dbConnect from "../lib/dbConnect";
import Layout from "@/components/Layout";

// Chat.getLayout = function getLayout(page) {
//   return (
//       <Layout title={"Favourite"}>{page}</Layout>
//   )
// }

export default function Chat(props) {
  //   const navigate = useNavigate();
  // const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [load, setload] = useState(false);
  //   const [currentChat, setCurrentChat] = useState(undefined);
  const [currentChat, setCurrentChat] = useState({
    username: "Please select a user to start the conversation.",
    email: "Rendering...",
    userId: "Rendering...",
    password: "Rendering...",
    faculty: "Rendering...",
    followerlist: [],
    followinglist: [],
    year: 0,
  });

  const [currentUser, setCurrentUser] = useState(undefined);
  const [userdata, setUserdata] = useState({
    username: "Rendering...",
    email: "Rendering...",
    userId: "Rendering...",
    password: "Rendering...",
    faculty: "Rendering...",
    followerlist: [],
    followinglist: [],
    year: 0,
  });

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  // fetching user data for profile
  useEffect(() => {
    if (!session) return;
    console.log(session.user);
    setCurrentUser(session.user); //set the current user
    // console.log("current ", currentUser);

    // get all contacts (i.e., user data)
    fetch("/api/user/")
      .then((res) => res.json())
      .then((data) => {
        //   setUserdata(data.data);console.log("user data", userdata);
        setContacts(data.data);
        console.log("contacts data", contacts);
        //   setfollow(data.data.followerlist.map(item=>(item.userId === session.user.userId)).includes(true));
      });
  }, [session, props]);

  // replaced by session above (identify current user)
  //   useEffect(async () => {
  //     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //       navigate("/login");
  //     } else {
  //       setCurrentUser(
  //         await JSON.parse(
  //           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //         )
  //       );
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (currentUser) {
  //       socket.current = io("http://localhost:3001");
  //       socket.current.emit("add-user", currentUser._id);
  //     }
  //   }, [currentUser]);

  //   useEffect(async () => {
  //     if (currentUser) {
  //       if (currentUser.isAvatarImageSet) {
  //         const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //         setContacts(data.data);
  //       } else {
  //         navigate("/setAvatar");
  //       }
  //     }
  //   }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    console.log("in chatv2", chat);
  };

  if (session) {
    return (
      <>
        <Head>
          <title>Twidemia</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Twidemia-logo.png" />
        </Head>

        <main className="flex max-h-screen h-full max-w-6xl mx-auto w-full gap-0 md:gap-12 overflow-y-hidden">
          <Sidebar user={session.user} />

          <div className="w-full grid grid-cols-7 my-auto mr-4 md:mx-12 rounded-md max-h-[90vh] bg-gray-100">
            <div className="col-span-2 h-[90vh]">
              <Contacts
                contacts={contacts}
                changeChat={handleChatChange}
                viewerid={session.user.userId}
                currentChat={currentChat}
              />
            </div>

            <div className="col-span-5 h-[90vh]">
              <ChatContainer
                currentChat={currentChat}
                session={session}
                viewer={session.user.userId}
              />
            </div>
          </div>
        </main>
      </>
    );
  }

  //   return (
  //     <>
  //       <div>
  //         <div className="container">
  //           <Contacts contacts={contacts} changeChat={handleChatChange} />
  //           {/* {currentChat === undefined ? (
  //             <Welcome />
  //           ) : (
  //             <ChatContainer currentChat={currentChat} socket={socket} />
  //           )} */}
  //           <ChatContainer currentChat={currentChat} socket={socket} />
  //         </div>
  //       </div>
  //     </>
  //   );
}

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .container {
//     height: 85vh;
//     width: 85vw;
//     background-color: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;

export async function getServerSideProps(context) {
  let isDbConnected = false;

  try {
    // Try to connect the DB.
    if (await dbConnect()) isDbConnected = true;
  } catch (e) {
    // If it cannot connect to DB, output log to console by using error flag.
    console.error(e);
  }

  let id = context.query.userid;
  // Return all post and login status by props.
  return { props: { isDbConnected } };
}

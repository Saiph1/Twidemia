import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
// import styled from "styled-components";
// import Logo from "../assets/logo.svg";

export default function Contacts({
  contacts,
  changeChat,
  viewerid,
  currentChat,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  //   const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  //   useEffect(async () => {
  //     const data = await JSON.parse(
  //       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //     );
  //     console.log(data);
  //     setCurrentUserName(data.username);
  //     setCurrentUserImage(data.avatarImage);
  //   }, []);

  // console.log("contact in contacts.jsx", contacts);
  async function changeCurrentChat(index, contact) {
    const newContact = contact;

    setCurrentSelected(newContact);
    // console.log("current select", currentSelected);

    changeChat(contact);
    // console.log("changeChat contact", contact);
  }

  return (
    <>
      {/* {currentUserImage && currentUserImage && ( */}
      <div className="border-r-[1px] border-neutral-200 h-full flex flex-col">
        <div className="brand border-b-[1px] border-neutral-200 bg-primary-blue">
          {/* <img src={Logo} alt="logo" /> */}
          <div className="py-3 px-2 text-center font-semibold flex justify-center items-center gap-2 text-white">
            <span className="hidden md:block">Messages</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </div>
        </div>

        <div className="contacts h-full overflow-y-auto flex flex-col">
            <div
              className={`flex items-center px-4 py-2 ${
                currentChat.username === "GPTutor"
                  ? "bg-gray-300 scale-120 border-l-[4px] border-primary-blue"
                  : "hover:bg-gray-200 "
              }`}
              onClick={() => changeCurrentChat(0, {username: "GPTutor", userId: "GPTutor"})}
            >
              <img
                className="rounded-full"
                width="40"
                src={"/default.png"}
                alt="img"
              />
              <div className="truncate ml-4 leading-5">
                <h4 className="font-bold text-[14px] truncate shining_word2">
                  GPTutor
                </h4>
              </div>
            </div>

          {contacts.map((contact, index) => {
            return contacts[index].userId != viewerid ? (
              <div
                className={`flex items-center px-4 py-2 ${
                  contact.username === currentChat.username
                    ? "bg-gray-300 scale-120 border-l-[4px] border-primary-blue"
                    : "hover:bg-gray-200 "
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <img
                  className="rounded-full"
                  width="40"
                  src={"/default.png"}
                  alt="img"
                />
                <div className="truncate ml-4 leading-5">
                  <h4 className="font-bold text-[14px] truncate">
                    {contact.username}
                  </h4>
                </div>
              </div>
            ) : (
              // <Contact_item single_userdata={contact} onClick={() => changeCurrentChat(index, contact)}/>

              // Originial method:
              // <div
              //   key={contact._id}
              //   className={`contact ${
              //     index === currentSelected ? "selected" : ""
              //   }`}
              //   onClick={() => changeCurrentChat(index, contact)}
              // >
              //   <div className="avatar">
              //     <img
              //     //   src={`data:image/svg+xml;base64,${contact.avatarImage}`}
              //       alt=""
              //     />
              //   </div>
              //   <div className="username">
              //     <h3>{contact.username}</h3>
              //   </div>
              //   </div>
              <></>
            );
          })}
        </div>

        {/* <div className="current-user">  
                <div className="avatar">
                <img
                    // src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                />
                </div>
                <div className="username">
                <h2>{currentUserName}</h2>
                </div>
            </div> */}
      </div>
      {/* )} */}
    </>
  );
}
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   background-color: #080420;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         // background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       background-color: #ffffff34;
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//     .selected {
//       background-color: #9a86f3;
//     }
//   }

//   .current-user {
//     background-color: #0d0d30;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;
//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// `;

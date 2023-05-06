// Purpose: Sidebar component

import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  HomeIcon,
  UserIcon,
  DotsHorizontalIcon,
  InboxIcon,
  SparklesIcon,
  BookOpenIcon,
  UserRemoveIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Tweet from "./Tweet/Tweet";
import Input from "./Input";
import TweetInput from "./Tweet/TweetInput";
import OverlayTweetInput from "./Tweet/OverlayTweetInput";
import { PresentationChartBarIcon } from "@heroicons/react/outline";

export default function Sidebar({ user, update = () => {} }) {
  // const handleProfile = (id, e) => {
  //     e.preventDefault;
  //     //router.push("/location?venueid="+id);
  //     router.push("/profile/" + id); //change to params
  // }
  const [open, setOpen] = useState(false);
  const router = useRouter();
  if (!user) {
    user = {
      username: "not signin",
      userId: "not signin",
    };
  }
  return (
    <div className="sticky top-0 z-50 flex flex-col justify-between items-start h-screen px-3 bg-white">
      <div>
        {/* Twidemia Logo */}
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
          {/* <Image width="50" height="50" src="/Twidemia-logo.png"> </Image> */}
          <img
            src={"/Twidemia-logo.png"}
            // style={{ height: "4em", width: "auto" }}
            className="aspect-square max-h-[4rem] w-auto"
          ></img>
        </div>

        {/* Menu */}
        <div className="mt-4 mb-2.5 justify-center lg:justify-start items-start">
          <Link href={"/"} active>
            <div className="flex gap-3 rounded-full p-3 items-center hover:bg-gray-200">
              <HomeIcon className="w-7" />
              <span className="font-[600] text-primary-black text-lg hidden md:block">
                Home
              </span>
            </div>
          </Link>
          <Link href={"/profile/" + user.userId}>
            <div className="flex gap-3 rounded-full p-3 items-center hover:bg-gray-200">
              <UserIcon className="w-7" />
              <span className="font-[500] text-primary-black text-lg hidden md:block">
                Profile
              </span>
            </div>
          </Link>
          <Link href={"/messages"}>
            <div className="flex gap-3 rounded-full p-3 items-center hover:bg-gray-200">
              <InboxIcon className="w-7" />
              <span className="font-[500] text-primary-black text-lg hidden md:block">
                Messages
              </span>
            </div>
          </Link>

          {user.userId == "adminid" ? (
            <Link href={"/admin"}>
              <div className="flex gap-3 rounded-full p-3 items-center hover:bg-gray-200">
                <PresentationChartBarIcon className="w-7" />
                <span className="font-[500] text-primary-black text-lg hidden md:block">
                  Admin Panel
                </span>
              </div>
            </Link>
          ) : (
            ""
          )}

          <Link href={"/explore"}>
            <div className="flex gap-3 rounded-full p-3 items-center hover:bg-gray-200">
              <SparklesIcon className="w-7 font-[800]" />
              <span className="shining_word font-[700] text-lg hidden md:block">
                Explore
              </span>
            </div>
          </Link>
        </div>

        {/* Button */}
        <button
          onClick={() => setOpen(true)}
          className="bg-primary-blue text-white rounded-full w-12 md:w-[90%] lg:w-full h-12 font-bold shadow-md hover:brightness-95 text-lg flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 block md:hidden"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
            />
          </svg>
          <span className="hidden md:block">Tweet</span>
        </button>
      </div>

      {/* Overlay part after the Tweet button is clicked */}
      <OverlayTweetInput open={open} setOpen={setOpen} />

      {/* Mini-Profile */}
      <button
        className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto"
        onClick={() => signOut()}
      >
        <img
          src="/Twidemia-logo.png"
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">{user.username}</h4>
          <p className="text-gray-500">@{user.userId}</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"></DotsHorizontalIcon>
      </button>
      {/* <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"></DotsHorizontalIcon> */}
    </div>
  );
}

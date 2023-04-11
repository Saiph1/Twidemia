import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  HomeIcon,
  UserIcon,
  DotsHorizontalIcon,
  InboxIcon,
  SparklesIcon,
  BookOpenIcon,
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
            className='aspect-square max-h-[4rem] w-auto'
          ></img>
        </div>

        {/* Menu */}
        <div className="mt-4 mb-2.5 xl-items-start">
          <Link href={"/"} active>
            <div className="flex gap-3 rounded-full p-3 items-center hover:hoverEffect">
              <HomeIcon className="w-7" />
              <span className="font-[600] text-primary-black text-lg hidden md:block">Home</span>
            </div>
          </Link>
          <Link href={"/profile/" + user.userId}>
            <div className="flex gap-3 rounded-full p-3 items-center hover:hoverEffect">
              <UserIcon className="w-7" />
              <span className="font-[500] text-primary-black text-lg hidden md:block">Profile</span>
            </div>
          </Link>
          <Link href={"/messages"}>
            <div className="flex gap-3 rounded-full p-3 items-center hover:hoverEffect">
              <InboxIcon className="w-7" />
              <span className="font-[500] text-primary-black text-lg hidden md:block">Messages</span>
            </div>
          </Link>
          <Link href={"/explore"}>
            <div className="flex gap-3 rounded-full p-3 items-center hover:hoverEffect">
              <SparklesIcon className="w-7" />
              <span className="shining_word font-[700] text-lg hidden md:block">Explore</span>
            </div>
          </Link>
        </div>

        {/* Button */}
        <button
          onClick={() => setOpen(true)}
          className="bg-primary-blue text-white rounded-full w-24 md:w-44 h-12 font-bold shadow-md hover:brightness-95 text-lg"
        >
          Tweet
        </button>
      </div>

      {/* Overlay part after the Tweet button is clicked */}
      <div className={`tweetOverlay ${open? 'visible opacity-100': 'hidden opacity-0'}`}>
        <div class="tweetDialog bg-gray-100 rounded-md px-4 pb-4 w-full max-w-[40%] mx-auto mt-20 relative">
          <span className="text-[32px] font-[300] text-gray-600 cursor-pointer" onClick={() => setOpen(false)}>&times;</span>
          <div className="mt-4">
            <TweetInput />
          </div>
        </div>
      </div>


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

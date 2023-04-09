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
import Tweet from "./Tweet";
import Input from "./Input";

// import './Sidebar.module.css'

export default function Sidebar({ user }) {
  // const handleProfile = (id, e) => {
  //     e.preventDefault;
  //     //router.push("/location?venueid="+id);
  //     router.push("/profile/" + id); //change to params
  // }

  const [open, setOpen] = useState(false);

  if (!user) {
    user = {
      username: "not signin",
      userId: "not signin",
    };
  }
  return (
    <div className="flex flex-col inline-block justify-between items-start h-full pr-20">
      <div>
        {/* Twidemia Logo */}
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
          {/* <Image width="50" height="50" src="/Twidemia-logo.png"> </Image> */}
          <img
            src={"/Twidemia-logo.png"}
            style={{ height: "4em", width: "auto" }}
          ></img>
        </div>

        {/* Menu */}
        <div className="mt-4 mb-2.5 xl-items-start">
          <Link href={"/"}>
            <SidebarMenuItem text="Home" Icon={HomeIcon} active />{" "}
          </Link>
          <a href={"profile"}>
            <SidebarMenuItem text="Profile" Icon={UserIcon} />{" "}
          </a>
          <SidebarMenuItem text="Messages" Icon={InboxIcon} />
          <Link href={"/explore"}>
            {/* <SidebarMenuItem text="Explore" Icon={SparklesIcon} /> */}
            <div className="flex gap-3 rounded-full p-3 items-center hover:hoverEffect">
              <SparklesIcon className="w-7" />
              <span className="shining_word font-[700] text-lg">Explore</span>
            </div>
          </Link>
        </div>

        {/* {open && (
            <div className="flex justify-center items-center fixed z-[9998] top-0 left-0 bg-slate-500 w-screen h-screen opacity-70">

            </div>
        )} */}
        {/* {open && (
            <div className="flex justify-center items-center fixed z-[9999] top-[50%] left-[50%] transform bg-black w-[500px] h-[200px] translate-x-[-50%] translate-y-[-50%] opacity-100">
                <p className="text-white">123</p>
            </div>
        )} */}

        {/* Button */}
        <button
          onClick={() => setOpen(true)}
          className="bg-primary-blue text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Tweet
        </button>
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

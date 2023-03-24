import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  HomeIcon,
  UserIcon,
  DotsHorizontalIcon,
  InboxIcon,
  BookOpenIcon,
} from "@heroicons/react/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Sidebar({ user }) {
  // const handleProfile = (id, e) => {
  //     e.preventDefault;
  //     //router.push("/location?venueid="+id);
  //     router.push("/profile/" + id); //change to params
  // }
  if (!user) {
    user = {
      username: "not signin",
      userId: "not signin",
    }
  }
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
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
        <a href="/">
          {" "}
          <SidebarMenuItem text="Home" Icon={HomeIcon} active />{" "}
        </a>
        <a href="profile">
          {" "}
          <SidebarMenuItem text="Profile" Icon={UserIcon} />{" "}
        </a>
        <a href="explore">
          {" "}
          <SidebarMenuItem text="Explore" Icon={BookOpenIcon} />{" "}
        </a>
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
      </div>

      {/* Button */}
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>

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
    </div>
  );
}

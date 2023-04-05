import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {HomeIcon, UserIcon, DotsHorizontalIcon, InboxIcon, SparklesIcon} from "@heroicons/react/solid"
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
        {/* Twidemia Logo */}
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
            {/* <Image width="50" height="50" src="/Twidemia-logo.png"> </Image> */}
            <img src={"/Twidemia-logo.png"} style={{height: "4em", width: "auto"}}></img>
        </div>

        {/* Menu */}
        <div className="mt-4 mb-2.5 xl-items-start"> 
            <SidebarMenuItem text="Home" Icon={HomeIcon} active/>
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <Link href={'/explore'} >
                <SidebarMenuItem text="Explore" Icon={SparklesIcon} />
            </Link>
        </div>

        {/* Button */}
        <button className="bg-primary-blue text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button> 
            


        {/* Mini-Profile */}
        <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto"> 
            <img src="/Twidemia-logo.png" alt="" className="h-10 w-10 rounded-full xl:mr-2"/>
            <div className="leading-5 hidden xl:inline">
                <h4 className="font-bold">User Name</h4>
                <p className="text-gray-500">@userID</p> 
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"></DotsHorizontalIcon>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"></DotsHorizontalIcon>
    </div>
  );
}

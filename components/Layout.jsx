import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import { useSession, signIn, signOut } from "next-auth/react";
// import { useTheme } from 'next-themes'

const Layout = ({ children }) => {
  const { status, data: session } = useSession({
    // required: true,
    // onUnauthenticated() {
    //   signIn();
    // },
  });

  // const {theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  // if(!mounted) return null
  // const systemTheme = 'dark'
  // const currentTheme = theme === 'system'? systemTheme : theme;
  // const bg_blackFull_whiteFull = currentTheme === 'dark' ? 'bg-black' : 'bg-white'

  return (
    <>
      <div className={`min-h-screen bg-white`}>
        <div className="h-full max-w-6xl container mx-auto xl:px-30">
          <div className="grid grid-cols-5 h-full">
            <Sidebar user={session?.user} />
            {/* <Sidebar /> */}
            <div className="col-span-4 lg:col-span-3 border-x-[1px]">
              {children}
            </div>
            <Widgets user={session?.user.userId} />
            {/* <Widgets /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

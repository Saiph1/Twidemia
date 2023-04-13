import React from "react";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import { useSession, signIn, signOut } from "next-auth/react";

const Layout = ({ children }) => {
  const { status, data: session } = useSession({
    // required: true,
    // onUnauthenticated() {
    //   signIn();
    // },
  });

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="h-full max-w-6xl container mx-auto xl:px-30">
          <div className="grid grid-cols-5 h-full">
            <Sidebar user={session?.user} />
            {/* <Sidebar /> */}
            <div className="col-span-4 lg:col-span-3 border-x-[1px]">
              {children}
            </div>
            <Widgets user={session?.user} />
            {/* <Widgets /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

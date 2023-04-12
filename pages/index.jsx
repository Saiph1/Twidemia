import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import Slider from "@mui/material/Slider";
// import '../styles/Index.mudule.css'

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Twidemia</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="/Twidemia-logo.png" />
      </Head>

      <main className="flex justify-center min-h-screen max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar user={session.user} />

        {/* Feed */}
        <Feed />

        {/* Widgets */}
        <Widgets user={session.user.userId} />

        {/* Model */}
      </main>
    </>
  );
}

Home.verify = true;

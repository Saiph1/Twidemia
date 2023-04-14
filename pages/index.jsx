import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import dbConnect from "../lib/dbConnect";
// import Tweet from "../models/Tweet";
// import User from "../models/User";

import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import Slider from "@mui/material/Slider";
import Layout from "@/components/Layout";
import { useState, createContext, useContext } from "react";
// import '../styles/Index.mudule.css'

Home.getLayout = function getLayout(page) {
  return <Layout title={"Favourite"}>{page}</Layout>;
};

export default function Home({ users, tweets }) {
  const { status, data: session } = useSession();

  return (
    <>
      <Head>
        <title>Twidemia</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="/Twidemia-logo.png" />
      </Head>

      <main className={`flex justify-center min-h-screen max-w-7xl mx-auto`}>
        {/* Sidebar */}
        {/* <Sidebar user={session.user} /> */}

        {/* Feed */}
        <Feed/>

        {/* Widgets */}
        {/* <Widgets user={session.user.userId} /> */}

        {/* Model */}
      </main>
    </>
  );
}

/*
// export async function getServerSideProps() {
export async function getStaticProps() {
  try {
    // Try to connect the DB.
    await dbConnect();
    const tweets = await Tweet.find();
    const users = await User.find().populate("tweetlist");
    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        tweets: JSON.parse(JSON.stringify(tweets)),
      },
    };
  } catch (e) {
    // If it cannot connect to DB, output log to console by using error flag.
    console.error(e);
  }
}
*/

Home.verify = true;

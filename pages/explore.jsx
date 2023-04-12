import ExploreTweet from "@/components/Explore/ExploreTweet";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import ExploreContainer from "@/components/Explore/ExploreContainer";
import React from "react";
import ExploreHeader from "@/components/Explore/ExploreHeader";
import Layout from "@/components/Layout";

Explore.getLayout = function getLayout(page) {
  return <Layout title={"Favourite"}>{page}</Layout>;
};

export default function Explore() {

  return (
    <>
      <Head>
        <title>Twidemia</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Twidemia-logo.png" />
      </Head>

      <div className="flex min-h-screen max-w-6xl w-full mx-auto">
        {/* <Sidebar user={session?.user}/> */}

        {/*ExploreContainer ?*/}
        <div className="border-gray-200 flex-grow w-full">
          <ExploreHeader />

          {/* delete later !! all comments */}
          <div className="py-8 flex flex-col items-center gap-4 bg-white">
            <ExploreTweet
              imageURL={
                "https://www.cse.cuhk.edu.hk/wp-content/uploads/people_large/FUNG-Ping-Fu.jpg"
              }
              name={"Micheal Fung"}
              userTag={"MF2022"}
              time={"2m"}
              content={
                "CSCI1130 is the most easiest CSCI coures!!! everyone gets A grade in my course :D"
              }
              commentNum={"103"}
              likes={"22"}
            />

            <ExploreTweet
              imageURL={
                "https://www.cse.cuhk.edu.hk/wp-content/uploads/people_large/Irwin-King.jpg"
              }
              name={"Irwin King"}
              userTag={"IK-uGG"}
              time={"54m"}
              content={
                "My CSCI2100A class will make you cry, try me! and come try yourself"
              }
              commentNum={"23"}
              likes={"122"}
            />

            <ExploreTweet
              imageURL={
                "https://www.cse.cuhk.edu.hk/wp-content/uploads/people_large/CHAN-Siu-On.jpg"
              }
              name={"Siu On"}
              userTag={"siu-on-chan"}
              time={"57m"}
              content={
                "CSCI3130 is just drawing some simple circle and that is it"
              }
              commentNum={"18"}
              likes={"40"}
            />

            <ExploreTweet
              imageURL={
                "https://www.cse.cuhk.edu.hk/wp-content/uploads/people/TAO-Yufei.jpg"
              }
              name={"Yufei Tao"}
              userTag={"@TaoYF"}
              time={"3h"}
              content={
                "Wanna have a faster algorithm? take my CSCI3160 course! It is SIMPLE and sweet"
              }
              commentNum={"34"}
              likes={"75"}
            />

            <ExploreTweet
              imageURL={
                "https://croucher.org.hk/wp-content/uploads/2011/07/Lyu-R-Michael-e1310028295489.jpg"
              }
              name={"Michael Lyu"}
              userTag={"Lyu-michael"}
              time={"1d"}
              content={
                "CSCI3100 course only have 3 assignments, very EASY right?"
              }
              commentNum={"41"}
              likes={"62"}
            />
          </div>
        </div>

        {/* <Widgets user={session?.user.userId}/> */}
      </div>
    </>
  );
}

Explore.verify = true;

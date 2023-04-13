import ExploreTweet from "@/components/Explore/ExploreTweet";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import ExploreContainer from "@/components/Explore/ExploreContainer";
import React from "react";
import { useEffect, useState } from "react";
import ExploreHeader from "@/components/Explore/ExploreHeader";
import Layout from "@/components/Layout";
import dbConnect from "@/lib/dbConnect";
import User from "../models/User"
import Tweet from "../models/Tweet"

Explore.getLayout = function getLayout(page) {
  return <Layout title={"Favourite"}>{page}</Layout>;
};

export async function getServerSideProps() {
  try {
    await dbConnect();
    const tweets = await Tweet.find();
    const users = await User.find(); 
    return {
      props: {
        tweets: JSON.parse(JSON.stringify(tweets)),
        users: JSON.parse(JSON.stringify(users)),
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

function calculatePostedTime(time) {
    const postTime = new Date(time).getTime() / 1000
    const currentTime = new Date().getTime() / 1000
    const timeDifferenceInMinute = Math.round((currentTime - postTime) / 60)
    if(timeDifferenceInMinute > (60*24*30*12)) { // year
      return Math.round(timeDifferenceInMinute/60/24/30/12) + "yr"
    } else if(timeDifferenceInMinute > (60*24*30)) { // month
      return Math.round(timeDifferenceInMinute/60/24/30) + "mo"
    } else if (timeDifferenceInMinute > (60*24)) { // day
      return Math.round(timeDifferenceInMinute/60/24) + "day"
    } else if (timeDifferenceInMinute > 60) { // hour
      return Math.round(timeDifferenceInMinute/60) + "hr"
    } else if (timeDifferenceInMinute < 1) {
      return 'just now'
    } else {
      return timeDifferenceInMinute + "min"
    } 
  }

export default function Explore({ users, tweets }) {
  const { status, data: session } = useSession();
  const [sortBy, setSortBy] = useState("recent"); // recent, topRated, popular

  let current_user = -1;

  if (current_user == -1) {
    for (var i in users) {
      if (users[i].userId == session.user.userId) {
        current_user = users[i];
        break;
      }
    }
  }


  if (sortBy == "topRated"){
    tweets.sort(function(a,b){
      if (a.likers.length == b.likers.length){
        return new Date(b.date) - new Date(a.date);
      }
      else{
        return b.likers.length - a.likers.length;
      }
    })
  }
  else if (sortBy == "recent"){
    tweets.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    })
  }
  else if (sortBy == "popular"){
    let now = Date.now()
    tweets.sort(function(a,b){
      let ad = now - new Date(a.date).getTime()
      let bd = now - new Date(b.date).getTime()
      if (a.likers.length == 0 && b.likers.length == 0){
        return ad - bd
      }
      else {
        return (b.likers.length*ad - a.likers.length*bd);
      }
    })
  }


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
          <ExploreHeader sortBy={sortBy} setSortBy={setSortBy}/>

          {/* delete later !! all comments */}
          <div className="py-8 flex flex-col items-center gap-4 bg-white">
            {tweets?.map((tweet) => {

              var uid = tweet.userID;
              var creator = -1;

              for (var i in users) {
                if (users[i]._id == uid) {
                  creator = users[i];
                  break;
                }
              }

              if (tweet.visibility == 0 ||
                  tweet.visibility == 1 &&
                  current_user.followinglist.includes(creator._id) ||
                  tweet.visibility >= 1 && session.user.userId == creator.userId) {
                return <ExploreTweet tweet={tweet} key={tweet.tweetID}
                  imageURL={
                    "https://croucher.org.hk/wp-content/uploads/2011/07/Lyu-R-Michael-e1310028295489.jpg"
                  }
                  name={creator.username}
                  userTag={creator.userId}
                  time={calculatePostedTime(new Date(tweet.date))}
                  content={tweet.content}
                  commentNum={tweet.comments.length}
                  likes={tweet.likers.length}
                />                
              }
            })}
          </div>
        </div>

        {/* <Widgets user={session?.user.userId}/> */}
      </div>
    </>
  );
}

Explore.verify = true;


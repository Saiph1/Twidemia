import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Tweet from "./Tweet/Tweet";
import TweetInput from "./Tweet/TweetInput";
//import TweetData from "./tweetHub"; // <-- delete later after the backend and database complete

//https://www.youtube.com/watch?v=u5gBoKVukIU  <--  UI design Link

export default function Input({ users, tweets }) {
  // Using .map() to generate each tweet post corresponds to each tweet object in database
  const { status, data: session } = useSession();

  // Simulating get data from backend

  var current_user = -1;

  if (current_user == -1) {
    for (var i in users) {
      if (users[i].userId == session.user.userId) {
        current_user = users[i];
        break;
      }
    }
  }

  console.log(current_user)

  console.log(current_user.followinglist)


  return (
    <div className="min-h-[100vh] bg-white w-full pb-8">
      <div className="pt-4 pb-4 px-3">
        <TweetInput />
      </div>

      <div className="h-[14px] bg-gray-100 border-l border-r" />

      <div className="flex flex-col items-center gap-8 mt-8">
        {tweets?.map((tweet) => {

          var uid = tweet.userID;
          var creator = -1;

          for (var i in users) {
            if (users[i]._id == uid) {
              creator = users[i];
              break;
            }
          }

          if (current_user != -1) {
            if (
              //tweet.visibility == 0 ||
              //(tweet.visibility == 1 &&
              //  current_user.followinglist.includes(creator._id)) ||
              //(tweet.visibility >= 1 && session.user.userId == creator.userId)
              tweet.visibility <= 1 && current_user.followinglist.includes(creator._id)
            ) {
              //tweet.iconURL = creator.iconURL;
              tweet.userName = creator.username;
              tweet.userCustomizeID = creator.userId;
              tweet.tweetContent = tweet.content;
              tweet.postDateTime = tweet.date;
              tweet.numOfComments = tweet.comments.length;
              tweet.numOfLikes = tweet.likers?.length;
              tweet.tweetID = tweet.tweetID;
              tweet.userId = tweet.userId;
              console.log(tweet.content,creator)
              return <Tweet tweet={tweet} key={tweet.tweetID} viewer={current_user} />;
            }
          }
        })}
      </div>
    </div>
  );
}

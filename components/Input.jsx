import Link from "next/link";
import { useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import TweetInput from "./Tweet/TweetInput";
//import TweetData from "./tweetHub"; // <-- delete later after the backend and database complete

//https://www.youtube.com/watch?v=u5gBoKVukIU  <--  UI design Link

export default function Input() {
  // Using .map() to generate each tweet post corresponds to each tweet object in database
  const [tweetData, setTweetData] = useState();
  const [alluser, setalluser] = useState();

  // Simulating get data from backend

  useEffect(() => {
    fetch("/api/tweet")
      .then((res) => res.json())
      .then((data) => {
        setTweetData(data.data);
        console.log("fetched all tweets.");
        console.log(data.data);
      })
  }, []);

  useEffect(() => {
    fetch("/api/user/")
      .then((res) => res.json())
      .then((data) => {
        setalluser(data.data);
        console.log("fetched all user.");
        console.log(data.data);
      })
  }, []);

  return (
    <div className="h-[200vh] bg-white">
      <div className="pt-4 pb-4 px-3">
        <TweetInput />
      </div>

      <div className="h-[14px] bg-gray-100 border-l border-r" />

      <div className="flex flex-col items-center gap-8 mt-8">
        {tweetData?.map((tweet) => {
          var uid = tweet.userID
          var creator = { iconURL: "", username: "", userId: 0 }
          for (var i in alluser){
            if (alluser[i]._id == uid) {
              creator = alluser[i]
              break
            }
          }
          //tweet.iconURL = creator.iconURL;
          tweet.userName = creator.username;
          tweet.userCustomizeID = creator.userId;
          tweet.tweetContent = tweet.content;
          tweet.postDateTime = tweet.date;
          tweet.numOfComments = tweet.comments.length;
          tweet.numOfLikes = tweet.likers.length;
          return <Tweet tweet={tweet} key={tweet.tweetID} />;
        })}
      </div>
    </div>
  );
}

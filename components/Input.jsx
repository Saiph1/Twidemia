import Link from "next/link";
import { useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import TweetInput from "./Tweet/TweetInput";
import TweetData from "./tweetHub"; // <-- delete later after the backend and database complete

//https://www.youtube.com/watch?v=u5gBoKVukIU  <--  UI design Link

export default function Input() {
  // Using .map() to generate each tweet post corresponds to each tweet object in database
  const [tweetData, setTweetData] = useState();

  // Simulating get data from backend
  useEffect(() => {
    setTweetData(TweetData);
  }, []);

  return ( 
    <div className="h-[200vh] bg-white w-full"> 
      <div className="pt-4 pb-4 px-3">
        <TweetInput />
      </div>

      <div className="h-[14px] bg-gray-100 border-l border-r" />

      <div className="flex flex-col items-center gap-8 mt-8">
        {tweetData?.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet.tweetID} />;
        })}
      </div>
    </div>
  );
}

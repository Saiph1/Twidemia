import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Tweet_profile = ({ tweet, viewerid }) => {
  // const [viewer, setviewer] = useState({tweetlist:[]});
  // const [retweet, setretweet] = useState(false);
  const router = useRouter();
  const [like, setlike] = useState(tweet.likers.includes(viewerid));

  function calculatePostedTime(time) {
    console.log("tweet = ", tweet);
    const postTime = new Date(time).getTime() / 1000;
    const currentTime = new Date().getTime() / 1000;
    const timeDifferenceInMinute = Math.round((currentTime - postTime) / 60);
    if (timeDifferenceInMinute > 60 * 24 * 30) {
      // month
      return Math.round(timeDifferenceInMinute / 60 / 24 / 30) + "mo";
    } else if (timeDifferenceInMinute > 60 * 24) {
      // day
      return Math.round(timeDifferenceInMinute / 60 / 24) + "day";
    } else if (timeDifferenceInMinute > 60) {
      // hour
      return Math.round(timeDifferenceInMinute / 60) + "hr";
    } else if (timeDifferenceInMinute < 1) {
      return "just now";
    } else {
      return timeDifferenceInMinute + "min";
    }
  }

  async function giveLike() {
    console.log(tweet.tweetID);
    var uid = viewerid;
    await fetch("/api/tweet/" + tweet.tweetID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tweetID: tweet.tweetID,
        liker: uid,
      }),
    })
      .then(() => {
        console.log("like done");
        setlike(true);
      })
      // .then(()=>location.reload());
      .then(() => router.replace(router.asPath));
  }

  async function revokeLike() {
    var uid = viewerid;
    await fetch("/api/tweet/" + tweet.tweetID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tweetID: tweet.tweetID,
        liker: uid,
      }),
    })
      .then(() => {
        console.log("revoke like done");
        setlike(false);
      })
      // .then(()=>location.reload());
      .then(() => router.replace(router.asPath));
  }
  // function handle_retweet(){
  //   console.log(retweet);
  //   fetch("/api/tweet/"+tweet.tweetID,{
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({viewer:viewer, retweet:true}),
  //   }).then((res)=>res.json())
  //   .then((data)=>{console.log("retweet done.");setretweet(!retweet);});
  // }

  // function handle_unretweet(){
  //   fetch("/api/tweet/"+tweet.tweetID,{
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({viewer:viewer, retweet:false}),
  //   }).then(()=>console.log("undone retweet done."))
  //   .then(()=>setretweet(!retweet));
  // }

  return (
    <div
      key={tweet.tweetID}
      className="shadow-tweetPosts bg-white flex rounded-2xl w-[90%] gap-4 py-3 px-6 min-h-[8rem]"
    >
      <div className="max-w-[3rem]">
        <img
          // this should be render accordingly
          src={tweet.userID?.avatar[0].content || "/default.png"}
          alt="icon"
          className="rounded-full w-full object-cover aspect-square"
        />
      </div>

      <div className="w-full">
        {/* This part is Name, ID, Date */}
        <div className="flex justify-between mb-2 items-center">
          <div className="flex flex-inline gap-4 items-center">
            <h5 className="font-bold">{tweet.userID.username}</h5>
            <small className="text-gray-400">@{tweet.userID.userId}</small>
            <h5 className="font-bold">
              {tweet.userID.userId != viewerid ? "(Retweeted)" : ""}
            </h5>
          </div>
          <p className="text-gray-500 text-[12px]">
            {calculatePostedTime(tweet.date)}
          </p>
        </div>

        {/* This part is tweet content */}
        <div className="mb-2">
          <p className="text-[16px] text-gray-600">{tweet.content}</p>
        </div>

        {/* This part is the Like, Comment, Share functions */}
        <div className="w-[40%] flex justify-between ml-[-0.5rem]">
          <Link
            href={`/posts/${tweet.tweetID}`}
            className="cursor-pointer  inline-flex gap-1 items-center text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-100 py-1 px-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
            <span className="text-[14px] ">{tweet.comments.length}</span>
          </Link>

          {/* <label className="cursor-pointer rounded-lg hover:bg-green-100 py-1 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              // onClick={()=>{if (!retweet) handle_retweet(); else handle_unretweet();}}
              class={"w-5 h-5 hover:text-green-500"+(retweet?" text-green-400":" text-gray-400")}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </label> */}

          <label className="cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-100 py-1 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${like ? "#FE8E86" : "none"}`}
              viewBox="0 0 24 24"
              stroke-width={`${like ? "0" : "1.75"}`}
              stroke="currentColor"
              class="w-5 h-5 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <button
              onClick={() => {
                if (!like) giveLike();
                else revokeLike();
              }}
              className="text-[14px] "
            >
              {tweet.likers.length}
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Tweet_profile;

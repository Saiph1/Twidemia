import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// import TweetData from "../../components/tweetHub";
import CommentData from "../../components/commentHub";
import Link from "next/link";
import Comment from "@/components/Comment";

const PostsDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  const [tweetOwnerInfo, setTweetOwnerInfo] = useState();
  const [tweetInfo, setTweetInfo] = useState({});

  useEffect(() => {
    // if (!session) return;
    console.log(postId);
    fetch("/api/tweet/" + postId)
      .then((res) => res.json())
      .then((data) => {
        // console.log("FETECH TWEET Data", data.data); // success fetch
        setTweetInfo({
          content: data.data.content,
          userId: data.data.userID.userId,
          username: data.data.userID.username,
          date: data.data.date,
          likelength: data.data.likers?.length
        });
        // console.log("TweetData after fetch", tweetInfo);
      })
  }, [postId]);

  // Fetch postId tweet data directly
  // const tweetInfo = TweetData.filter((tweet) => {
  //   return tweet.tweetID === postId;
  // })[0];

  const commentsOfTweet = CommentData.filter((comment) => {
    return comment.tweetID === postId;
  });

  return (
    <main className="flex min-h-screen max-w-7xl w-full mx-auto">
      <Sidebar />

      <div className="border-l border-r border-gray-200 xl:min-w-[700px] flex-grow max-w-xl  mr-12">
        <div className="">
          <Link
            href={"/"}
            className="flex items-center gap-1 border-b py-4 px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <h4 className="font-semibold">Tweet</h4>
          </Link>
        </div>

        {/* tweet owner and tweet info */}
        <div className="py-4 px-3 flex gap-4">
          {/* icon */}
          <div className="max-w-[3rem]">
            <img
              src={tweetInfo?.iconURL}
              className="rounded-full w-full object-cover aspect-square"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="inline-flex gap-2 items-center">
                <p className="font-semibold">{tweetInfo?.username}</p> {/* usernaeme */}
                <p className="text-gray-500 text-sm font-light">
                  @{tweetInfo?.userId}   {/* userID */}
                </p>
              </div>
              <p className="text-gray-500 text-xs font-light">
                {tweetInfo?.date}
              </p>
            </div>

            <div className="mb-2">{tweetInfo?.content}</div>

            <div className="flex justify-between items-center w-3/10">
              <label className="cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-100 py-1 px-2">
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
                <span className="text-[14px] ">{tweetInfo?.comments}</span>
              </label>
              <label className="cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-100 py-1 px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="text-[14px] ">{tweetInfo?.likelength}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="h-[14px] bg-gray-100 border-l border-r" />

        {/* Tweeting */}
        <div className="pt-4 pb-2 px-3 border-b ">
          <div className="flex gap-4">
            <div className="max-w-[3rem]">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRr0YlatAy-hrNCQjzZ7fqDzNiXt7HGmzVaA&usqp=CAU"
                }
                className="rounded-full w-full object-cover aspect-square"
              />
            </div>
            <div className="pr-4 w-full">
              <textarea
                className="w-full min-h-[100px] my-1 py-2 px-3 rounded-sm focus:border-0"
                placeholder="Tweet your reply.."
              />
            </div>
          </div>
          <div className="text-end pr-4">
            <button className="bg-primary-blue text-white py-2 px-4 rounded-3xl">
              Reply
            </button>
          </div>
        </div>

        {/* comments */}
        {commentsOfTweet.length > 0 &&
          commentsOfTweet?.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
      </div>

      <Widgets />

      {/* Model */}
    </main>
  );
};

export default PostsDetail;


// A server function which will run for every client request.
// It will run before the main functions.
// export async function getServerSideProps(context) {
//   let isDbConnected = false;

//   try {
//       // Try to connect the DB.
//       if (await dbConnect()) isDbConnected = true;
//   } catch (e) {
//       // If it cannot connect to DB, output log to console by using error flag.
//       console.error(e)
//   }

//   let id = context.query;
//   console.log("server side", id)
//   // Return all post and login status by props.
//   return {props: {isDbConnected, id}};
// }
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// import TweetData from "../../components/tweetHub";
import CommentData from "../../components/commentHub";
import Link from "next/link";
import Comment from "@/components/Comment";
import { useSession, signIn } from "next-auth/react";
import Layout from "@/components/Layout";

// PostsDetail.getLayout = function getLayout(page) {
//   return <Layout title={"Favourite"}>{page}</Layout>;
// };

const PostsDetail = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [tweetOwnerInfo, setTweetOwnerInfo] = useState();
  const [tweetInfo, setTweetInfo] = useState();
  const [load, setload] = useState(false);
  const [comment_array, setComment_array] = useState([1, 2, 3, 4, 5]);
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  function calculatePostedTime(time) {
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

  useEffect(() => {
    if (!session) return;
    console.log(postId);
    fetch("/api/tweet/" + postId)
      .then((res) => res.json())
      .then((data) => {
        console.log("FETECH TWEET Data", data); // success fetch
        setTweetInfo({
          content: data.data?.tweet?.content,
          userId: data.data?.tweet?.userID?.userId,
          username: data.data?.tweet.userID?.username,
          date: data.data?.tweet?.date,
          likelength: data.data?.tweet?.likers?.length,
          commentLength: data.data?.tweet?.comments?.length,
          comments: data.data?.comment.map((item, index) => [
            item.content,
            item.author.username,
            item.postDateTime,
          ]),
        });
        setload(true);
        // console.log('123123123123' + tweetInfo?.content);
        // console.log('123123123123' + tweetInfo?.userId);
        // console.log('123123123123' + tweetInfo?.username);
        // console.log('123123123123' + tweetInfo?.date);
        // console.log('123123123123' + tweetInfo?.likelength);
        // console.log('123123123123' + tweetInfo?.comments);
        // setComment_array((prev)=>[...prev, "1122"]);
        // console.log("TweetData after fetch", tweetInfo);
      });
  }, [postId, load]);

  // Fetch postId tweet data directly
  // const tweetInfo = TweetData.filter((tweet) => {
  //   return tweet.tweetID === postId;
  // })[0];

  const commentsOfTweet = CommentData.filter((comment) => {
    return comment.tweetID === postId;
  });

  const [commentContent, setCommentContent] = useState("");

  function handlePost() {
    setload(false);
    if (commentContent === "") {
      return;
    }

    fetch("/api/comment", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        content: commentContent,
        postId: postId,
        userId: session.user.userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("the data", data);
        setCommentContent("");
      });
  }

  if (session) {
    return (
      <main className="min-h-screen bg-white">
        <div className="h-full max-w-6xl container mx-auto xl:px-30">
          <div className="h-full grid grid-cols-5">
            {/* <Sidebar /> */}
            {/* <div className="col-span-1"> */}
            <Sidebar user={session.user} />
            {/* </div> */}
            <div className="col-span-4 lg:col-span-3 border-x-[1px]">
              <div className="w-full min-h-screen">
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
                <div className="py-4 px-3 flex gap-4 w-full">
                  {/* icon */}
                  {/* <div className="max-w-[3rem]">
            <img
              src={tweetInfo?.iconURL}  
              className="rounded-full w-full object-cover aspect-square"
            />  
          </div> */}

                  <div className="full">
                    <div className="flex justify-between items-center mb-2 w-full">
                      <div className="inline-flex gap-2 items-center">
                        <p className="font-semibold">{tweetInfo?.username}</p>{" "}
                        {/* usernaeme */}
                        <p className="text-gray-500 text-sm font-light">
                          @{tweetInfo?.userId} {/* userID */}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs font-light">
                        {", sent " +
                          calculatePostedTime(tweetInfo?.date) +
                          " ago"}
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
                        <span className="text-[14px] ">
                          {tweetInfo?.commentLength}
                        </span>{" "}
                        {/* comments not rendered yet */}
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
                        <span className="text-[14px] ">
                          {tweetInfo?.likelength}
                        </span>
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
                        id="commentForm"
                        onChange={(ev) => setCommentContent(ev.target.value)}
                        value={commentContent}
                      />
                    </div>
                  </div>
                  <div className="text-end pr-4">
                    <button
                      onClick={handlePost}
                      className="bg-primary-blue text-white py-2 px-4 rounded-3xl"
                    >
                      Reply
                    </button>
                  </div>
                </div>

                {/* comments */}
                {tweetInfo?.comments?.map((comment, index) => {
                  // console.log("logged comment", tweetInfo.comments);
                  // let tmp = [];
                  // tmp.push(tweetInfo.comments[index]);
                  // console.log("the tmp", tmp);
                  // comment.content1 = comment.content;
                  // console.log(comment.content1)
                  // comment.author1 = comment.author.userId;
                  // comment.postDateTime1 = toString(comment.postDateTime);
                  return (
                    <Comment
                      content={comment[0]}
                      author={comment[1]}
                      postDateTime={comment[2]}
                      key={index}
                    />
                  );
                  // return <Comment comment={comment} key={comment._id} />;
                })}

                {/* {tweetInfo?.comments} */}
              </div>
            </div>
            <Widgets user={session.user.userId} />
          </div>
        </div>
        {/* Model */}
      </main>
    );
  }
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

PostsDetail.verify = true;

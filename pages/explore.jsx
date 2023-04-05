import ExploreTweet from "@/components/ExploreTweet";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import React from "react";

const Explore = () => {
  return (
    <div className="flex min-h-screen max-w-7xl w-full mx-auto">
      <Sidebar />

      <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
        <div href={"/"} className="flex items-center gap-1 border-b py-4 px-3">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg> */}
          <h4 className="font-semibold">Explore</h4>
        </div>
        <div className="border-b flex ">
          <div className="flex gap-2 p-4 pr-8 border-b-[#FF1493] border-b-4 text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recent
          </div>
          <div className="flex gap-2 p-4 pr-8 text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            Top Rated
          </div>
          <div className="flex gap-2 p-4 pr-8 text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
              />
            </svg>
            Popular
          </div>
        </div>
        <div className="bg-gray-100 flex gap-3 py-3 px-5 border-b">
          <p className="font-[400] py-1 px-3 rounded-full bg-[#252525] text-white border">
            Difficulty
          </p>
          <p className="font-[400] py-1 px-3 rounded-full bg-white border">
            Grading
          </p>
          <p className="font-[400] py-1 px-3 rounded-full bg-white border">
            Rewarding
          </p>
          <p className="font-[400] py-1 px-3 rounded-full bg-white border">
            Sources
          </p>
          <div className="font-[400] py-1 px-3 rounded-xl bg-white border flex gap-1 items-center">
            Search
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <div>
              <input className="w-[120px] border rounded-xl" />
            </div>
          </div>
        </div>

        {/* delete later !! all comments */}
        <div className="my-8 flex flex-col items-center gap-4">
          <ExploreTweet />

          <div className="shadow-tweetPosts bg-white flex rounded-2xl w-9/10 gap-4 py-3 px-6 min-h-[8rem]">
            <div className="max-w-[3rem]">
              <img
                src={
                  "https://www.cse.cuhk.edu.hk/wp-content/uploads/people_large/Irwin-King.jpg"
                }
                alt="icon"
                className="rounded-full w-full object-cover aspect-square"
              />
            </div>

            <div className="w-full">
              {/* This part is Name, ID, Date */}
              <div className="flex justify-between mb-2 items-center">
                <div className="flex flex-inline gap-4 items-center">
                  <h5 className="font-bold">Irwin King</h5>
                  <small className="text-gray-400">@IK-uGG</small>
                </div>
                <p className="text-gray-500 text-[12px]">54m</p>
              </div>

              {/* This part is tweet content */}
              <div className="mb-2">
                <p className="text-[16px] text-gray-600">
                  My CSCI2100A class will make you cry, try me! and come try
                  yourself
                </p>
              </div>

              {/* This part is the Like, Comment, Share functions */}
              <div className="w-4/10 flex justify-between ml-[-0.5rem]">
                <div className="cursor-pointer  inline-flex gap-1 items-center text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-100 py-1 px-2">
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
                  <span className="text-[14px] ">23</span>
                </div>

                <label className="cursor-pointer rounded-lg hover:bg-green-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.75"
                    stroke="currentColor"
                    class="w-5 h-5 text-gray-400 hover:text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </label>

                <label className="cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FE8E86"
                    viewBox="0 0 24 24"
                    stroke-width="0"
                    stroke="currentColor"
                    class="w-5 h-5 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span className="text-[14px] ">122</span>
                </label>
              </div>
            </div>
          </div>

          <div className="shadow-tweetPosts bg-white flex rounded-2xl w-9/10 gap-4 py-3 px-6 min-h-[8rem]">
            <div className="max-w-[3rem]">
              <img
                src={
                  "https://www.cse.cuhk.edu.hk/wp-content/uploads/people_large/CHAN-Siu-On.jpg"
                }
                alt="icon"
                className="rounded-full w-full object-cover aspect-square"
              />
            </div>

            <div className="w-full">
              {/* This part is Name, ID, Date */}
              <div className="flex justify-between mb-2 items-center">
                <div className="flex flex-inline gap-4 items-center">
                  <h5 className="font-bold">Siu On</h5>
                  <small className="text-gray-400">@siu-on-chan</small>
                </div>
                <p className="text-gray-500 text-[12px]">54m</p>
              </div>

              {/* This part is tweet content */}
              <div className="mb-2">
                <p className="text-[16px] text-gray-600">
                  CSCI3130 is just drawing some simple circle and that is it
                </p>
              </div>

              {/* This part is the Like, Comment, Share functions */}
              <div className="w-4/10 flex justify-between ml-[-0.5rem]">
                <div className="cursor-pointer  inline-flex gap-1 items-center text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-100 py-1 px-2">
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
                  <span className="text-[14px] ">18</span>
                </div>

                <label className="cursor-pointer rounded-lg hover:bg-green-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.75"
                    stroke="currentColor"
                    class="w-5 h-5 text-gray-400 hover:text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </label>

                <label className="cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FE8E86"
                    viewBox="0 0 24 24"
                    stroke-width="0"
                    stroke="currentColor"
                    class="w-5 h-5 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span className="text-[14px] ">40</span>
                </label>
              </div>
            </div>
          </div>

          <div className="shadow-tweetPosts bg-white flex rounded-2xl w-9/10 gap-4 py-3 px-6 min-h-[8rem]">
            <div className="max-w-[3rem]">
              <img
                src={
                  "https://croucher.org.hk/wp-content/uploads/2011/07/Lyu-R-Michael-e1310028295489.jpg"
                }
                alt="icon"
                className="rounded-full w-full object-cover aspect-square"
              />
            </div>

            <div className="w-full">
              {/* This part is Name, ID, Date */}
              <div className="flex justify-between mb-2 items-center">
                <div className="flex flex-inline gap-4 items-center">
                  <h5 className="font-bold">Michael Lyu</h5>
                  <small className="text-gray-400">@Lyu-michael</small>
                </div>
                <p className="text-gray-500 text-[12px]">3h</p>
              </div>

              {/* This part is tweet content */}
              <div className="mb-2">
                <p className="text-[16px] text-gray-600">
                  CSCI3100 course only have 3 assignments, very EASY right?
                </p>
              </div>

              {/* This part is the Like, Comment, Share functions */}
              <div className="w-4/10 flex justify-between ml-[-0.5rem]">
                <div className="cursor-pointer  inline-flex gap-1 items-center text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-100 py-1 px-2">
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
                  <span className="text-[14px] ">41</span>
                </div>

                <label className="cursor-pointer rounded-lg hover:bg-green-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.75"
                    stroke="currentColor"
                    class="w-5 h-5 text-gray-400 hover:text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </label>

                <label className="cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FE8E86"
                    viewBox="0 0 24 24"
                    stroke-width="0"
                    stroke="currentColor"
                    class="w-5 h-5 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span className="text-[14px] ">62</span>
                </label>
              </div>
            </div>
          </div>

          <div className="shadow-tweetPosts bg-white flex rounded-2xl w-9/10 gap-4 py-3 px-6 min-h-[8rem]    justify-center">
            <div className="max-w-[3rem]">
              <img
                src={
                  "https://www.cse.cuhk.edu.hk/wp-content/uploads/people/TAO-Yufei.jpg"
                }
                alt="icon"
                className="rounded-full w-full object-cover aspect-square"
              />
            </div>

            <div className="w-full">
              {/* This part is Name, ID, Date */}
              <div className="flex justify-between mb-2 items-center">
                <div className="flex flex-inline gap-4 items-center">
                  <h5 className="font-bold">Yufei Tao</h5>
                  <small className="text-gray-400">@TaoYF</small>
                </div>
                <p className="text-gray-500 text-[12px]">1d</p>
              </div>

              {/* This part is tweet content */}
              <div className="mb-2">
                <p className="text-[16px] text-gray-600">
                  Wanna have a faster algorithm? take my CSCI3160 course! It is
                  SIMPLE and sweet
                </p>
              </div>

              {/* This part is the Like, Comment, Share functions */}
              <div className="w-4/10 flex justify-between ml-[-0.5rem]">
                <div className="cursor-pointer  inline-flex gap-1 items-center text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-100 py-1 px-2">
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
                  <span className="text-[14px] ">34</span>
                </div>

                <label className="cursor-pointer rounded-lg hover:bg-green-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.75"
                    stroke="currentColor"
                    class="w-5 h-5 text-gray-400 hover:text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </label>

                <label className="cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-100 py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FE8E86"
                    viewBox="0 0 24 24"
                    stroke-width="0"
                    stroke="currentColor"
                    class="w-5 h-5 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span className="text-[14px] ">75</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Widgets />
    </div>
  );
};

export default Explore;

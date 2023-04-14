import { useState } from "react";
import { useSession } from "next-auth/react";
import TweetInputImage from "./TweetInputImage";

export default function TweetInput() {
  const [privacySetting, setPrivacySetting] = useState("Public");
  const [input, setInput] = useState("Public");
  const { status, data: session } = useSession();
  const [content, setContent] = useState("");
  const [tweetInputWarning, setTweetInputWarning] = useState(false);

  async function postTweet(e) {
    e.preventDefault();
    if (!content) {
      setTweetInputWarning(true);
      setTimeout(() => {
        setTweetInputWarning(false);
      }, [4000]);
      return;
    }
    var privacy_num;
    if (privacySetting == "Public") {
      privacy_num = 0;
    } else if (privacySetting == "Follower") {
      privacy_num = 1;
    } else if (privacySetting == "Self") {
      privacy_num = 2;
    }
    await fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({
        content: content,
        vis: privacy_num,
        creator: session.user.userId,
      }),
    });

    setContent("");
    alert("Success");
  }

  function privacyOptionUI(name) {
    switch (name) {
      case "Public":
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
              />
            </svg>
            Public
          </>
        );
        break;
      case "Follower":
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            Follower-only
          </>
        );
        break;
      case "Self":
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
            Self-only
          </>
        );
        break;
    }
  }

  return (
    <div className="flex gap-4">
      <div className="max-w-[3rem]">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRr0YlatAy-hrNCQjzZ7fqDzNiXt7HGmzVaA&usqp=CAU"
          }
          className="rounded-full w-full object-cover aspect-square"
        />
      </div>

      {tweetInputWarning && (
        <div className="border-l-[6px] border-[#b3935d] max-h-[70px] h-full w-[360px] bg-[#ffd48a] rounded-md absolute py-3 px-3 z-[500] flex justify-between items-center left-[50%] transform translate-x-[-50%] top-[16%]">
          <h3 className="text-lg font-semibold">
            You forgot to share something..
          </h3>
          <span
            className="text-2xl cursor-pointer"
            onClick={() => setTweetInputWarning(false)}
          >
            &times;
          </span>
        </div>
      )}

      <div className="pr-4 w-full relative">
        {/* privacy setting here */}
        <div className="px-2 reletive grid gap-3">
          <button className="toggle">
            <div className="flex gap-3">{privacyOptionUI(privacySetting)}</div>
          </button>
          <ul className="list">
            <li
              onClick={() => setPrivacySetting("Public")}
              className="flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-200 font-semibold"
            >
              {privacyOptionUI("Public")}
            </li>
            <li
              onClick={() => setPrivacySetting("Follower")}
              className="flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-200 font-semibold"
            >
              {privacyOptionUI("Follower")}
            </li>
            <li
              onClick={() => setPrivacySetting("Self")}
              className="flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-200 font-semibold"
            >
              {privacyOptionUI("Self")}
            </li>
          </ul>
        </div>

        {/* Input tweet content area */}
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[100px] my-1 py-2 px-3 rounded-sm text-xl text-primary-black focus:outline-0 placeholder:text-xl bg-transparent"
          placeholder="What is happening?"
          value={content}
        />

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-3">
          <TweetInputImage image={"https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg"} />
          <TweetInputImage image={"https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg"} />
        </div> */}

        {/* upload media icons */}
        <div className="flex justify-between ml-3 items-center border-t pt-3">
          <div className="flex gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#1D9BF0"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#1D9BF0"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#1D9BF0"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#1D9BF0"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <button
            onClick={postTweet}
            className="bg-[#1D9BF0] text-white py-2 px-4 rounded-3xl"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

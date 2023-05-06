// Purpose: Widgets item component

import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Widgets_item({
  single_userdata,
  update_page = () => {},
  viewerid = "",
  button = true,
}) {
  const router = useRouter();
  const [follow, setfollow] = useState();
  const [loading, setloading] = useState(true);
  // const [load, setload] = useState(false);

  useEffect(() => {
    fetch("/api/user/" + single_userdata.userId)
      .then((res) => res.json())
      .then((data) => {
        setfollow(
          data.data?.followerlist
            .map((item) => item.userId === viewerid)
            .includes(true)
        );
      })
      .then(() => {
        console.log("Fetched user follow state.");
        setloading(false);
      });
  }, [follow]);

  function handle_follow() {
    setloading(true);
    fetch("/api/follow/" + viewerid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(single_userdata),
    })
      .then(() => console.log("follow done"))
      .then(() => setfollow(true))
      .then(() => setloading(false));
  }

  function handle_unfollow() {
    setloading(true);
    fetch("/api/follow/" + viewerid, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(single_userdata),
    })
      .then(() => console.log("unfollow done"))
      .then(() => setfollow(false))
      .then(() => setloading(false));
  }

  return (
    <div className="w-full flex items-center px-4 py-2 hover:bg-gray-200 ">
      <img
        className="rounded-full"
        width="40"
        src={
          !single_userdata.avatar.length
            ? "/default.png"
            : single_userdata.avatar[0].content
        }
        alt="img"
      />
      <div className="truncate ml-4 leading-5">
        <Link href={"/profile/" + single_userdata.userId}>
          <h4
            className="font-bold hover:underline text-[14px] truncate cursor-pointer"
            onClick={() => update_page()}
          >
            {single_userdata.username}
          </h4>
        </Link>
        <h5 className="text-[13px] text-gray-500 truncate">
          @{single_userdata.userId}
        </h5>
      </div>
      {!loading && button && (
        <button
          className={
            !follow
              ? "ml-auto bg-white text-black border-2 rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-gray-400 hover:text-black px-5"
              : "ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-gray-400 hover:text-black"
          }
          onClick={() => {
            !follow ? handle_follow() : handle_unfollow();
            // setload(false);
          }}
        >
          {!follow ? "Follow" : "Unfollow"}
        </button>
      )}
      {loading && button && (
        <button
          disabled
          type="button"
          class="ml-auto bg-white text-black border-2 rounded-full text-sm px-7 py-1.5 font-bold hover:bg-gray-400 hover:text-black px-5"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

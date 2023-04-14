import React from "react";

const Comment = ({ content, author, postDateTime }) => {
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

  return (
    <div
      // key={comment._id}
      className="border-b py-4 px-3 flex gap-4 hover:bg-gray-100"
    >
      {/* <div className="max-w-[3rem]">
        <img
          src={"public/default.png"}
          alt="icon"
          className="rounded-full w-full object-cover aspect-square"
        />
      </div> */}

      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="inline-flex gap-2 items-center">
            <p className="font-semibold">{author}</p>
            <p className="text-gray-500 text-sm font-light">@ user_id</p>
          </div>
          <p className="text-gray-500 text-xs font-light">
            {", send " + calculatePostedTime(postDateTime) + " ago"}
          </p>
        </div>

        <div className="mb-2">{content}</div>
      </div>
    </div>
  );
};

export default Comment;

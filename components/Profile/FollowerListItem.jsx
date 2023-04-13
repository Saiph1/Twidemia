import React from "react";

const FollowerListItem = (props) => {
  return (
    <div className="my-4">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-4 items-center">
          <div className="w-[48px] flex rounded-full overflow-hidden bg-green-400">
            <img src="123" className="w-full aspect-square object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-[500]">
              {/* {user.followerlist[index].username} */}
              im_samtung
            </span>
            <span className="text-gray-700 font-[400]">
              {/* {"@" + user.followerlist[index].userId} */}
              @SamTung
            </span>
          </div>
        </div>
        {/* Follow/Unfollow button */}
        <button className="hover:opacity-80 rounded-xl bg-primary-blue text-white w-[100px] py-2 font-[600] md:py-3">
          {props.followed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default FollowerListItem;

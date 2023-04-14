import React from "react";

const TweetInputImage = (props) => {
  return (
    <>
      <div className="border rounded-2xl bg-gray-200 w-full overflow-hidden">
        <img src={props.image} />
      </div>
    </>
  );
};

export default TweetInputImage;

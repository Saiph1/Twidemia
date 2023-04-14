import TweetInput from "./TweetInput";

export default function OverlayTweetInput({ open, setOpen }) {
  return (
    <>
      {/* Overlay part after the Tweet button is clicked */}
      <div
        className={`tweetOverlay ${
          open ? "visible opacity-100" : "hidden opacity-0"
        }`}
      >
        <div class="tweetDialog bg-gray-100 rounded-md px-4 pb-4 w-full max-w-[40%] mx-auto mt-20 relative">
          <span
            className="text-[32px] font-[300] text-gray-600 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            &times;
          </span>
          <div className="mt-4">
            <TweetInput />
          </div>
        </div>
      </div>
    </>
  );
}

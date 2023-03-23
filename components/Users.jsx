import TweetData from "./tweetHub";

export default function Input({ users }) {
  function handleclick(userId) {
    console.log(`Remove ${userId}`);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-8 mt-8">
        {users.map((user) => {
          return (
            <div
              key={user.userID}
              className="shadow-tweetPosts bg-white flex rounded-2xl w-9/10 gap-4 py-3 px-6 min-h-[8rem]"
            >
              <div className="max-w-[3rem]">
                <img
                  src={TweetData[0].iconURL}
                  alt="icon"
                  className="rounded-full w-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between mb-2 items-center">
                  <div className="flex flex-inline gap-4 items-center">
                    <h5 className="font-bold">{user.username}</h5>
                    <small className="text-gray-400">@{user.userId}</small>
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-[16px] text-gray-600">{user.email}</p>
                  <p className="text-[16px] text-gray-600">
                    {user.createdDate}
                  </p>
                </div>
              </div>
              <div className="w-4/10 flex justify-between ml-[-0.5rem]">
                <button
                  class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={() => handleclick(user.userId)}
                >
                  Delete User
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Purpose: User component

import TweetData from "./tweetHub";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Users({ users }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showUser, setShowUser] = useState(users);
  const [query, setQuery] = useState("");
  const [deleteUser, setDeleteUser] = useState({
    username: "",
    email: "",
    userId: "",
  });

  useEffect(() => {
    const tmp = users.filter(
      (user) =>
        !query ||
        (user.userId.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
          query.toLowerCase()) ||
        (user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
          query.toLowerCase())
    );
    setShowUser(tmp);
  }, [users]);

  function handleclick(user) {
    setOpen(true);
    setDeleteUser(user);
    setMessage("Do you want to remove the user?");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const changeSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
    const tmp = users.filter(
      (user) =>
        !query ||
        (user.userId.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
          query.toLowerCase()) ||
        (user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
          query.toLowerCase())
    );
    setShowUser(tmp);
  };
  const handleDelete = async () => {
    const endpoint = `/api/user/${deleteUser.userId}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    const idx = users.indexOf(deleteUser);
    users.splice(idx, 1);
    const tmp = users.filter(
      (user) =>
        !query ||
        (user.userId.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
          query.toLowerCase()) ||
        (user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
          query.toLowerCase())
    );
    setShowUser(tmp);

    handleClose();
  };

  return (
    <div className="border-l border-r border-gray-200 xl:min-w-[700px] flex-grow max-w-7xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer py-2">
          Admin Panel
        </h2>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              Username: {deleteUser.username} <br></br>
              User email: {deleteUser.email} <br></br>
              User Id: {deleteUser.userId} <br></br>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <div className="flex mx-auto w-[90%] rounded-2xl overflow-hidden border-2 mt-8">
        <span className="bg-gray-100 py-4 px-6 flex gap-1 items-center">
          <span className="hidden lg:block">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="User ID.."
          onChange={changeSearch}
          className="py-4 px-6 focus:outline-none text-lg w-full"
        />
      </div>

      <div className="flex flex-col items-center mt-8 [&>*:nth-child(odd)]:bg-gray-100 rounded-2xl overflow-hidden w-[90%] mx-auto pb-8">
        <div className="border bg-white flex w-full gap-4 py-6 px-3 hover:bg-gray-200">
          <div className="w-full items-center">
            <div className="grid grid-cols-[1fr_3fr_2fr_2fr_2fr] gap-2 items-center justify-center">
              <h5 className="font-[800] text-lg text-center">Delete</h5>
              <h5 className="font-[800] text-lg text-center">User ID</h5>
              <h5 className="font-[800] text-lg text-center truncate">
                User Name
              </h5>
              <h5 className="font-[800] text-lg text-center truncate">
                User Email
              </h5>
              <h5 className="font-[800] text-lg text-center truncate">
                Created Date
              </h5>
            </div>
          </div>
        </div>
        {showUser
          .filter((user) => !user.admin)
          .map((user) => {
            return (
              <div
                key={user.userId}
                className="border bg-white flex w-full gap-4 py-4 px-2 hover:bg-gray-200"
              >
                {/* <div className="max-w-[3rem]">
                  <img
                    src={TweetData[0].iconURL}
                    alt="icon"
                    className="rounded-full w-full object-cover"
                  />
                </div> */}

                <div className="w-full items-center">
                  <div className="grid grid-cols-[1fr_3fr_2fr_2fr_2fr] gap-2 items-center justify-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleclick(user)}
                        className="text-white hover:underline bg-red-500 text-center rounded-xl py-2 min-w-[40px] w-[70%]"
                      >
                        &#x2715;
                      </button>
                    </div>
                    <h5 className="font-bold text-center">{user.userId}</h5>
                    <h5 className="font-bold text-center truncate">
                      {user.username}
                    </h5>
                    <h5 className="font-bold text-center truncate">
                      {user.email}
                    </h5>
                    <h5 className="font-bold text-center truncate">
                      {user.createdDate.slice(0, 10)}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

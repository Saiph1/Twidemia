import TweetData from "./tweetHub";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Input({ users }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteUser, setDeleteUser] = useState({
    username: "",
    email: "",
    userId: "",
  });

  function handleclick(user) {
    setOpen(true);
    setDeleteUser(user);
    setMessage("Do you want to remove the user?");
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Users</h2>
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
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <div className="flex flex-col items-center gap-8 mt-8">
        {users
          .filter((user) => !user.admin && user.userId != "1234")
          .map((user) => {
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
                    <p className="text-[16px] text-gray-600">
                      Email: {user.email}
                    </p>
                    <p className="text-[16px] text-gray-600">
                      Created Date: {user.createdDate.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <div className="w-4/10 flex justify-between ml-[-0.5rem]">
                  <button
                    class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => handleclick(user)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

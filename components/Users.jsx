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
    <div className="border-l border-r border-gray-200 xl:min-w-[700px] flex-grow max-w-7xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer py-2">Users</h2>
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

      <div className="flex flex-col items-center mt-8 [&>*:nth-child(odd)]:bg-gray-100 bg-black rounded-2xl overflow-hidden w-[90%] mx-auto">
        <div className="border bg-white flex w-full gap-4 py-6 px-3 hover:bg-gray-200">
            <div className="w-full items-center">
                <div className="grid grid-cols-[1fr_3fr_2fr_2fr_2fr] gap-2 items-center justify-center">
                    <h5 className="font-[800] text-lg text-center">Delete</h5>
                    <h5 className="font-[800] text-lg text-center">User ID</h5>
                    <h5 className="font-[800] text-lg text-center truncate">User Name</h5>
                    <h5 className="font-[800] text-lg text-center truncate">User Email</h5>
                    <h5 className="font-[800] text-lg text-center truncate">Created Date</h5>
                </div>
            </div>
        </div>
        {users
          .filter((user) => !user.admin && user.userId != "1234")
          .map((user) => {
            return (
              <div
                key={user.userId}
                className="border bg-white flex w-full gap-4 py-6 px-3 hover:bg-gray-200"
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
                        <button onClick={() => handleclick(user)} className="text-white hover:underline bg-red-500 text-center rounded-xl py-2 min-w-[40px] w-[70%]">&#x2715;</button>
                      </div>
                      <h5 className="font-bold text-center">{user.userId}1983234o23iu4oi23</h5>
                      <h5 className="font-bold text-center truncate">{user.username}</h5>
                      <h5 className="font-bold text-center truncate">{user.email}</h5>
                      <h5 className="font-bold text-center truncate">{user.createdDate.slice(0, 10)}</h5>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";

import Link from "@mui/material/Link";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FollowerListItem from "./Profile/FollowerListItem";

export default function ProfileContainer({
  user,
  myprofile,
  loaded,
  update_parent,
  viewerid = "",
  followed = false,
  followupdate = () => {},
  editupdate,
}) {
  const [open, setOpen] = React.useState(false);
  const [follower, setFollowerOpen] = React.useState(false);
  const [followingListOpen, setFollowingListOpen] = React.useState(false);
  // For user information.
  const [load, setload] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [facultyValue, setFacultyValue] = React.useState("");
  // https://codesandbox.io/s/9rm8pv?file=/demo.tsx
  const faculties = [
    {
      value: "Faculty of Engineering",
      label: "Faculty of Engineering",
    },
    {
      value: "Faculty of Arts",
      label: "Faculty of Arts",
    },
    {
      value: "Faculty of Eductaion",
      label: "Faculty of Education",
    },
    {
      value: "Faculty of Law",
      label: "Faculty of Law",
    },
  ];

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleDoneClose = () => {
    // setUsername(document.getElementById("name").value);
    // setDescription(document.getElementById("description").value);
    // // setFacultyValue(facultyValue);
    // console.log(facultyValue);
    // console.log(document.getElementById("name").value);
    // console.log(document.getElementById("description").value);
    updateUser();
    editupdate();
    setOpen(false);
  };

  const handleCreateNewItem = (e) => {
    e.preventDefault();
    setFacultyValue(e.target.value);
    // console.log(facultyValue)
  };

  //   const handleClick = event => {
  //     const { myValue } = event.currentTarget.dataset;
  //     console.log(myValue) // --> 123
  // }

  const handleFollowerOpen = () => {
    setFollowerOpen(true);
  };

  const handleFollowerClose = () => {
    setFollowerOpen(false);
  };
  // console.log("myprofile", myprofile)

  const handle_follow = () => {
    setload(false);
    fetch("/api/follow/" + viewerid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => console.log("follow done"))
      .then(() => followupdate())
      .then(() => setload(true));
  };

  const handle_unfollow = () => {
    setload(false);
    fetch("/api/follow/" + viewerid, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => console.log("unfollow done"))
      .then(() => followupdate())
      .then(() => setload(true));
  };

  function updateUser() {
    let requestBody = {
      username,
      description,
      facultyValue,
    };

    try {
      // Post the user.
      fetch("/api/user/" + user.userId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  }
  if (load) {
    return (
      <div className="w-full min-h-screen">
        <div className="flex py-4 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <h4 className="sm:text-xl font-semibold cursor-pointer">Profile</h4>
        </div>

        <div>
          <Card
            sx={{ minWidth: 275 }}
            style={{ border: "none", boxShadow: "none" }}
          >
            <CardActions
              style={{
                backgroundImage: `url("../test_background.avif")`,
                height: 200,
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/Avatar_test.png"
                sx={{
                  width: 110,
                  height: 110,
                  display: "flex",
                  justifyContent: "flex-start",
                  position: "relative",
                  top: 100,
                  margin: 1,
                  border: "3px solid lightgrey",
                }}
              />
            </CardActions>

            <CardContent>
              <CardActions
                disableSpacing
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                {!myprofile && (
                  <Button
                    disableRipple
                    class="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 border border-gray-300 rounded shadowpy-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    size="small"
                  >
                    Block
                  </Button>
                )}
                {!myprofile && load && (
                  <Button
                    disableRipple
                    class={
                      !followed
                        ? "bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 border border-gray-300 rounded shadowpy-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        : "bg-black hover:bg-gray-300 text-blue-500 py-2 px-4 border border-gray-300 rounded shadowpy-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-200 focus:outline-none bg-black rounded-full border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    }
                    size="small"
                    onClick={() => {
                      if (!followed) handle_follow();
                      else handle_unfollow();
                    }}
                  >
                    {!followed ? "Follow" : "Unfolllow"}
                  </Button>
                )}

                {!myprofile && !load && (
                  <button
                    disabled
                    type="button"
                    class="ml-auto bg-white text-black border-2 rounded-full text-sm px-6 py-1.5 font-bold px-5"
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

                {myprofile && (
                  <Button
                    disableRipple
                    class="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 border border-gray-300 rounded shadowpy-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    size="small"
                    onClick={handleEditOpen}
                  >
                    Edit profile
                  </Button>
                )}
              </CardActions>

              {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Word of the Day </Typography> */}
              <Typography variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                @{user.userId}
              </Typography>

              <Link
                component="button"
                onClick={handleFollowerOpen}
                // sx={{ mb: 1.5 }} color="text.secondary"
                variant="subtitle1"
              >
                {user.followerlist.length} follower
              </Link>

              <Link
                component="button"
                onClick={() => {
                  // ...process something
                  setFollowingListOpen(true);
                }}
                // sx={{ mb: 1.5 }} color="text.secondary"
                variant="subtitle1"
              >
                {user.followinglist.length}following
              </Link>

              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.followinglist.length} following {user.followerlist.length} follower
              </Typography> */}
              <Typography variant="body2">
                Year {user.year}.
                <br />
                {user.faculty}
                <br />
                {user.Description}
              </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions> */}
          </Card>
          <Dialog open={open} onClose={handleEditClose}>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText> */}

              <Tooltip title="Change your avatar">
                <IconButton>
                  <Avatar
                    alt="Remy Sharp"
                    src="/Avatar_test.png"
                    sx={{ width: 80, height: 80 }}
                  />
                </IconButton>
              </Tooltip>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="User Name"
                type="string"
                fullWidth
                variant="standard"
                onChange={() =>
                  setUsername(document.getElementById("name").value)
                }
                required
              />

              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="string"
                fullWidth
                variant="standard"
                helperText="Please input a description for least 100 words."
                onChange={() =>
                  setDescription(document.getElementById("description").value)
                }
                required
              />
              {/* <DialogContentText>
                            Please input a description at least 100 words.
                        </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="faculty"
                select
                label="Faculty"
                defaultValue=""
                helperText="Please select your faculty"
                onChange={handleCreateNewItem}
              >
                {faculties.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button onClick={handleDoneClose}>Done</Button>
            </DialogActions>
          </Dialog>

          <div>
            <div
              className={`tweetOverlay ${
                follower ? "visible opacity-100" : "hidden opacity-0"
              }`}
            >
              <div class="tweetDialog bg-gray-100 rounded-md px-4 pb-4 w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] mx-auto mt-20 relative">
                <div className="relative border-b-[1px] border-neutral-300 flex justify-center">
                  <p className="py-3 text-lg font-[500]">Follower</p>
                  <span
                    className="absolute right-0 top-0 font-[300] text-gray-600 text-[32px] w-fit  cursor-pointer "
                    onClick={() => setFollowerOpen(false)}
                  >
                    &times;
                  </span>
                </div>
                <div className="mt-4">
                  {/* @Jen, map the followerlist with this component, but I haven't set and props inside */}
                  <FollowerListItem followed={false} />
                  <FollowerListItem followed={true} />

                  {/* {user.followerlist.map((file, index) => (
                          <div key={user.followerlist[index].userId}>
                              <div>
                                  <img src="123" alt="user-icon" />
                              </div>
                              <div>
                                <span>
                                  {user.followerlist[index].username}
                                </span>
                                <span>
                                  {"@" + user.followerlist[index].userId}
                                </span>
                              </div>
                          </div>
                      ))} */}
                </div>
              </div>
            </div>

            <div
              className={`tweetOverlay ${
                followingListOpen ? "visible opacity-100" : "hidden opacity-0"
              }`}
            >
              <div class="tweetDialog bg-gray-100 rounded-md px-4 pb-4 w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] mx-auto mt-20 relative">
                <div className="relative border-b-[1px] border-neutral-300 flex justify-center">
                  <p className="py-3 text-lg font-[500]">Following</p>
                  <span
                    className="absolute right-0 top-0 font-[300] text-gray-600 text-[32px] w-fit  cursor-pointer "
                    onClick={() => setFollowingListOpen(false)}
                  >
                    &times;
                  </span>
                </div>
                <div className="mt-4">
                  {/* @Jen, map the followerlist with this component, but I haven't set and props inside */}
                  <FollowerListItem followed={false} />
                  <FollowerListItem followed={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen">
        <div className="flex py-4 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 header-shadow-bottom">
          <h4 className="sm:text-xl font-semibold cursor-pointer">Profile</h4>
        </div>
        <div role="status" className="flex justify-center py-20">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

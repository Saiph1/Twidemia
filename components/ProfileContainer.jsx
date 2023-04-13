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
import axios from "axios";

// import avatar from "./Avatar_test.png"

export default function ProfileContainer({
  user,
  myprofile,
  loaded,
  update_parent,
  viewerid = "",
  followed = false,
  blocked = false,
  followupdate = () => {},
  editupdate,
  updates_true,
  block_update = () => {},
}) {
  const [open, setOpen] = React.useState(false);
  const [follower, setFollowerOpen] = React.useState(false);
  const [following, setFollowingOpen] = React.useState(false);
  // For user information.
  const [username, setUsername] = React.useState("");
  const [year, setYear] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [facultyValue, setFacultyValue] = React.useState("");
  const [avatar, setavatar] = React.useState("");
  const [background, setbackground] = React.useState("");

  const [postImage, setPostImage] = React.useState({ myFile: "" });
  const [postBgImage, setPostBgImage] = React.useState({ myBgFile: "" });
  // const inputFile = useRef(null)

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
    setPostImage({ myFile: "" });
    setPostBgImage({ myFile: "" });
    setOpen(false);
  };

  const handleDoneClose = () => {
    // setUsername(document.getElementById("name").value);
    // setDescription(document.getElementById("description").value);
    // // setFacultyValue(facultyValue);
    // console.log(facultyValue);
    // console.log(document.getElementById("name").value);
    // console.log(document.getElementById("description").value);

    createPost(postImage); // for image upload
    console.log("Uploaded");

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

  const handleFollowingOpen = () => {
    setFollowingOpen(true);
  };

  const handleFollowingClose = () => {
    setFollowingOpen(false);
  };

  const handle_follow = () => {
    update_parent();
    fetch("/api/follow/" + viewerid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => console.log("follow done"))
      .then(() => followupdate())
      .then(() => updates_true());
  };

  const handle_unfollow = () => {
    update_parent();
    fetch("/api/follow/" + viewerid, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => console.log("unfollow done"))
      .then(() => followupdate())
      .then(() => updates_true());
  };

  const handle_block = () => {
    // update_parent();
    fetch("/api/block/" + viewerid + "/" + user.userId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => console.log("block done"))
      .then(() => block_update());
    // .then(()=>updates_true())
  };

  const handle_unblock = () => {
    // update_parent();
    fetch("/api/block/" + viewerid + "/" + user.userId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => console.log("unblock done"))
      .then(() => block_update());
    // .then(()=>updates_true())
  };

  // post profile image
  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  // post background image
  const createBgPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    // console.log("file", file)
    const base64 = await convertToBase64(file);
    console.log(base64);
    setavatar(base64);
    setPostImage({ ...postImage, myFile: base64 });
    // console.log("postimage", postImage.myFile);
  };

  const handleBgFileUpload = async (e) => {
    const file = e.target.files[0];
    // console.log("file", file)
    const base64 = await convertToBase64(file);
    console.log(base64);
    setbackground(base64);
    setPostBgImage({ ...postBgImage, myBgFile: base64 });
    // console.log("postimage", postImage.myFile);
  };

  const handleBgFileSubmit = (e) => {
    e.preventDefault();
    createBgPost(postBgImage);
    console.log("Uploaded bg image");
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  function updateUser() {
    let requestBody = {
      username,
      year,
      description,
      facultyValue,
      avatar,
      background,
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
  // this loaded is used from the parent state "load"
  if (loaded) {
    return (
      <div className="w-full min-h-screen">
        <div className="flex py-4 px-3 sticky top-0 z-20 bg-white border-b border-gray-200">
          <h4 className="sm:text-xl font-semibold cursor-pointer">Profile</h4>
        </div>

        <div>
          <Card
            sx={{ minWidth: 275 }}
            style={{ border: "none", boxShadow: "none" }}
          >
            <CardMedia
              image={
                user.background.length
                  ? user.background[0].content
                  : "../test_background.avif"
              }
              style={{ height: 200 }}
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  user.avatar.length
                    ? user.avatar[0].content
                    : "/Avatar_test.png"
                }
                sx={{
                  width: 110,
                  height: 110,
                  display: "flex",
                  justifyContent: "flex-start",
                  position: "relative",
                  top: 140,
                  margin: 1,
                  border: "3px solid lightgrey",
                }}
              />
            </CardMedia>

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
                    onClick={() => {
                      if (!blocked) handle_block();
                      else handle_unblock();
                    }}
                  >
                    {!blocked ? "Block" : "unblock"}
                  </Button>
                )}
                {!myprofile && !blocked && (
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

                {/* {(!myprofile) && <button disabled type="button" class="ml-auto bg-white text-black border-2 rounded-full text-sm px-6 py-1.5 font-bold px-5">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
              </button>} */}

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

              {!blocked ? (
                <Link
                  component="button"
                  onClick={handleFollowerOpen}
                  // sx={{ mb: 1.5 }} color="text.secondary"
                  variant="subtitle1"
                >
                  {user.followerlist.length} Follower
                </Link>
              ) : (
                <></>
              )}

              {!blocked ? (
                <Link
                  component="button"
                  onClick={handleFollowingOpen}
                  // sx={{ mb: 1.5 }} color="text.secondary"
                  variant="subtitle1"
                >
                  {user.followinglist.length}Following
                </Link>
              ) : (
                <></>
              )}

              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.followinglist.length} following {user.followerlist.length} follower
              </Typography> */}
              {!blocked ? (
                <Typography variant="body2">
                  Year {user.year}.
                  <br />
                  {user.faculty}
                  <br />
                  {user.Description}
                </Typography>
              ) : (
                <></>
              )}
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
                <IconButton
                  variant="contained"
                  component="label"
                  htmlFor="file-upload"
                  className="custom-file-upload"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      user.avatar.length
                        ? postImage.myFile || user.avatar[0].content
                        : postImage.myFile || "/Avatar_test.png"
                    }
                    sx={{ width: 80, height: 80 }}
                  />
                  <input
                    type="file"
                    label="Image"
                    name="myFile"
                    id="file-upload"
                    accept=".jpeg, .png, .jpg"
                    hidden
                    onChange={(e) => handleFileUpload(e)}
                  />
                </IconButton>
              </Tooltip>

              <DialogContent>Upload background image </DialogContent>
              <label htmlFor="file-upload-bg" className="custom-file-upload">
                <img
                  src={
                    user.background.length
                      ? postBgImage.myBgFile || user.background[0].content
                      : postBgImage.myBgFile || "../test_background.avif"
                  }
                  alt=""
                />
              </label>

              <form onSubmit={handleBgFileSubmit}>
                <input
                  type="file"
                  label="Image"
                  name="myFile"
                  id="file-upload-bg"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleBgFileUpload(e)}
                />
                <button>Submit</button>
              </form>

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
                id="year"
                label="Year"
                type="string"
                fullWidth
                variant="standard"
                onChange={() => setYear(document.getElementById("year").value)}
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

          <Dialog open={follower} onClose={handleFollowerClose} fullWidth>
            {/* mapping followers */}
            {user.followerlist.map((file, index) => (
              <List key={user.followerlist[index].username}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    class="px-5"
                    primary={user.followerlist[index].username}
                    secondary={"@" + user.followerlist[index].userId}
                  />
                </ListItem>
              </List>
            ))}

            <DialogActions>
              <Button onClick={handleFollowerClose}>Close</Button>
            </DialogActions>
          </Dialog>

          {/* for following list */}
          <Dialog open={following} onClose={handleFollowingClose} fullWidth>
            {/* mapping followers */}
            {user.followinglist.map((file, index) => (
              <List key={user.followinglist[index].username}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    class="px-5"
                    primary={user.followinglist[index].username}
                    secondary={"@" + user.followinglist[index].userId}
                  />
                </ListItem>
              </List>
            ))}

            <DialogActions>
              <Button onClick={handleFollowingClose}>Close</Button>
            </DialogActions>
          </Dialog>
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

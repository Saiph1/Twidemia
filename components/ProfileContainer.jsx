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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';

import Link from '@mui/material/Link';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function ProfileContainer({user, myprofile, loaded, update_parent} ) {
  const [open, setOpen] = React.useState(false);
  const [follower, setFollowerOpen] = React.useState(false);
  // For user information.
  const [username, setUsername] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [facultyValue, setFacultyValue] = React.useState('');
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
    update_parent();
    setOpen(false);
  };

  const handleCreateNewItem = (e) => {
    e.preventDefault();
    setFacultyValue(e.target.value)
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

  function updateUser() {

    let requestBody = {
        username,
        description,
        facultyValue,
    };

    try {
        // Post the user.
        fetch('/api/user/' + user.userId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody),
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data));
    } catch (error) {
        console.log(error);
    }
}
  if (loaded){
    return (
      <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Profile</h2>
        </div>
        
        <Card
          sx={{ minWidth: 275 }}
          style={{ border: "none", boxShadow: "none"}}
        >
          <CardActions style={{backgroundImage: `url("../test_background.avif")`,  height: 240 }}>
            <Avatar
            alt="Remy Sharp"
            src="/Avatar_test.png"
            sx={{ width: 100, height: 100 , display: "flex", justifyContent: "flex-start", position: "relative", top:120, margin:1 , border: "2.5px solid lightgrey"}}
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
            {(!myprofile) && <Button 
            class="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 mx-4 border border-gray-300 rounded shadow " 
            size="small" 
            >
              Block
            </Button>}
            
            {(!myprofile) && <Button 
            class="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 border border-gray-300 rounded shadow " 
            size="small" 
            >
              Follow
            </Button>}
  
            {(myprofile)&&<Button 
            class="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 border border-gray-300 rounded shadow" 
            size="small" 
            onClick={handleEditOpen}
            >
              Edit profile
            </Button>}
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
              X follower
            </Link>
  
  
            <Link
              component="button" 
              onClick={() => {
                // ...process something
              }}
              // sx={{ mb: 1.5 }} color="text.secondary"
              variant="subtitle1"
            >
              X following
            </Link>
            
            
            
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {user.followinglist.length} following {user.followerlist.length} follower
            </Typography> */}
            <Typography variant="body2">
              Year {user.year}. 
              <br/>
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
              onChange={()=>setUsername(document.getElementById("name").value)}
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
              onChange={()=>setDescription(document.getElementById("description").value)}
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
          <List >
            {
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={handleFollowerClose}>
                    Follow
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    {/* <FolderIcon /> */}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  class="px-5"
                  primary="Single-line item"
                  secondary={true ? 'Secondary text' : null}
                />
              </ListItem>
            }
          </List>
  
          <DialogActions>
            <Button onClick={handleFollowerClose}>Close</Button>
          </DialogActions>
        </Dialog>
  
  
      </div>
    );
  }
  else {
    return (
      <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Profile</h2>
        </div>
        <div role="status" className = "flex justify-center py-20">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>


    )
  }
  
}

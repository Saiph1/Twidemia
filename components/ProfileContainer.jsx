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

export default function ProfileContainer() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Profile</h2>
      </div>
      
      <Card
        sx={{ minWidth: 275 }}
        style={{ border: "none", boxShadow: "none"}}
      >
        <CardActions style={{backgroundImage: `url("test_background.avif")`,  height: 240 }}>
          <Avatar
          alt="Remy Sharp"
          src="/Avatar_test.png"
          sx={{ width: 100, height: 100 , display: "flex", justifyContent: "flex-start", position: "relative", top:120, margin:1  }}
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
          <Button 
          class="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 border border-gray-300 rounded shadow" 
          size="small" 
          onClick={handleClickOpen}
          >
            Edit profile
          </Button>
        </CardActions>
          
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Word of the Day </Typography> */}
          <Typography variant="h5" component="div">
            Username
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            @User_Id
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            X following X follower
          </Typography>
          <Typography variant="body2">
            Year X. Major/minor
            <br />
            {
              "Input a description with at leaast 100 words Input a description with at leaast 100 words Input a description with at leaast 100 words"
            }
          </Typography>
        </CardContent>
        {/* <CardActions>
            <Button size="small">Learn More</Button>
            </CardActions> */}
      </Card>
      <Dialog open={open} onClose={handleClose}>
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
            required
          />

          <TextField
            autoFocus
            margin="dense"
            id="faculty"
            label="Description"
            type="string"
            fullWidth
            variant="standard"
            helperText="Please input a description for least 100 words."
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
          >
            {faculties.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

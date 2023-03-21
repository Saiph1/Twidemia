/**
 * CSCI2720/ESTR2106 Course Project
 * A Social Map of Events
 *
 * We declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * We also acknowledge that we are aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name:    Chi Hsuan LI
 *                  Noel MATHEWS
 *                  Tsz Chuen SHEK
 *                  Han Yi WANG
 *                  Sun Leung YU
 * Student ID  :    1155136539
 *                  1155130840
 *                  1155128002
 *                  1155136569
 *                  1155128708
 * Date        :    2022-12-17
 */

/**
 * Location Table
 * Programmer: Jackie and Jennifer
 * Last Update: 2022-12-17
 * Purpose: Location Table for 1. List all locations 2. Seaarch the location with corresponding keyword
 */

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function Profile() {
  return (
    <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Profile</h2>
      </div>

      <Card
        sx={{ minWidth: 275 }}
        style={{ border: "none", boxShadow: "none" }}
      >
        <CardActions
          disableSpacing
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            p: 3,
          }}
        >
          <Button size="small">Edit profile</Button>
        </CardActions>
        <Avatar
          alt="Remy Sharp"
          src="/Twidemia-logo.png"
          sx={{ width: 100, height: 100 }}
        />
        <CardContent>
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Word of the Day </Typography> */}
          <Typography variant="h5" component="div">
            xxx
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            @xxx
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
    </div>
  );
}

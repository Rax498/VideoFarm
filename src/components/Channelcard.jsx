import React from "react";
import { Box, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { demoProfilePicture } from "../utils/constants";

const Channelcard = ({ channelDetail }) => {
  // console.log(channelDetail);
  return (
    <Box
      sx={{
        width: "320px",
        height: 290,
        textAlign: "center",
      }}
    >
      <Box>
        <Link to={`/channel/${channelDetail?.id?.channelId} `}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          />

          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              marginLeft: 8,
            }}
          />

          <Typography
            variant="h6"
            color={(theme) => theme.palette.primary.dark}
          >
            {channelDetail?.snippet?.title}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Channelcard;

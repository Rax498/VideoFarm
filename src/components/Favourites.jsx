import React from "react";
import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";
import Videos from "./Videos";

const Favourites = () => {
  const videos = useSelector((state) => state.fav.favTab);
  if (videos.length === 0) {
    return (
      <Typography
        variant="h4"
        height="89vh"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Favourites List is empty....!
      </Typography>
    );
  }
  return (
    <Box height="90vh">
      <Typography
        variant="h4"
        sx={{
          color: "orange",
          p: 3,
          textAlign: "center",
        }}
      >
        Favourites Videos
      </Typography>
      <Videos videos={videos} removeButtton={true} />
    </Box>
  );
};
export default Favourites;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Box, Button, Stack, Typography } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import Videos from "./Videos";

const Favourites = () => {
  const videos = useSelector((state) => state.fav.favTab);
  if (videos.length === 0) {
    return (
      <Stack
        height="89vh"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <FavoriteBorder sx={{ fontSize: 64, color: "primary.main" }} />
        <Typography variant="h5" fontWeight={600}>
          No favourites yet
        </Typography>
        <Typography color="text.secondary">
          Tap the heart on any video to save it here.
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 1 }}>
          Browse videos
        </Button>
      </Stack>
    );
  }
  return (
    <Box minHeight="90vh">
      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          fontWeight: 700,
          p: 3,
          textAlign: "center",
        }}
      >
        Favourite Videos
      </Typography>
      <Videos videos={videos} removeButtton={true} />
    </Box>
  );
};
export default Favourites;

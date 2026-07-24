import React from "react";
import { Stack, Box } from "@mui/material";

import { Channelcard, Loader, Videocard } from "./";

const Videos = ({ videos, direction, removeButtton }) => {
  if (!videos?.length) return <Loader />;

  const items = videos.map((video, idx) => (
    <Box key={video.id?.videoId || video.id?.channelId || idx}>
      {video.id.videoId && (
        <Videocard video={video} removeButtton={removeButtton} />
      )}
      {video.id.channelId && <Channelcard channelDetail={video} />}
    </Box>
  ));

  if (direction === "column") {
    return <Stack gap={3}>{items}</Stack>;
  }

  // fluid grid: columns stretch to fill the row exactly, like YouTube
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 3,
      }}
    >
      {items}
    </Box>
  );
};

export default Videos;

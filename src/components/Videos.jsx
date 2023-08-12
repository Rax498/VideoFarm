import React from "react";
import { Stack, Box } from "@mui/material";

import { Channelcard, Loader, Videocard } from "./";

const Videos = ({ videos, direction, removeButtton }) => {
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="center"
      alignvideos="center"
      gap={3}
    >
      {videos.map((video, idx) => (
        <Box key={idx}>
          {video.id.videoId && (
            <Videocard video={video} removeButtton={removeButtton} />
          )}
          {video.id.channelId && <Channelcard channelDetail={video} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;

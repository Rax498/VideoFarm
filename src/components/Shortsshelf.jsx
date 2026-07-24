import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Bolt } from "@mui/icons-material";
import Shortscard from "./Shortscard";

const Shortsshelf = ({ shorts }) => {
  if (!shorts?.length) return null;

  return (
    <Box mb={3}>
      <Stack direction="row" alignItems="center" gap={0.5} mb={1}>
        <Bolt sx={{ color: "primary.main" }} />
        <Typography variant="h6" fontWeight={700}>
          Shorts
        </Typography>
      </Stack>
      <Stack
        direction="row"
        gap={2}
        sx={{
          overflowX: "auto",
          pb: 1,
        }}
      >
        {shorts.map((short) => (
          <Shortscard key={short.id.videoId} video={short} />
        ))}
      </Stack>
    </Box>
  );
};

export default Shortsshelf;

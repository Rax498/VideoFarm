import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

// One placeholder shaped like a real Videocard: thumbnail, two title
// lines, then the channel row
const CardSkeleton = () => (
  <Box>
    <Skeleton
      variant="rounded"
      animation="wave"
      sx={{ width: "100%", height: "auto", aspectRatio: "1 / 0.56" }}
    />
    <Skeleton animation="wave" sx={{ mt: 1.5, fontSize: 14, width: "90%" }} />
    <Skeleton animation="wave" sx={{ fontSize: 14, width: "60%" }} />
    <Stack direction="row" alignItems="center" gap={1} mt={1}>
      <Skeleton variant="circular" animation="wave" width={28} height={28} />
      <Skeleton animation="wave" sx={{ fontSize: 12, width: "40%" }} />
    </Stack>
  </Box>
);

// same fluid grid as the real Videos grid, so content lands exactly
// where the placeholders were
const Loader = ({ count = 8 }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 3,
    }}
  >
    {Array.from({ length: count }, (_, index) => (
      <CardSkeleton key={index} />
    ))}
  </Box>
);

export default Loader;

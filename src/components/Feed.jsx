import React from "react";
import { useState, useEffect } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import { Sidebar, Videos, Shortsshelf, ErrorState } from "./";
import fetchFeedVideos from "../utils/fetchFeed";

const Feed = ({ sidebarOpen = true }) => {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  const [selectedcategori, setSelectedcategori] = useState("New");
  // ---------------------------  fetching details based on selected caterori ---------------------
  useEffect(() => {
    setFeed(null);
    setError(null);
    fetchFeedVideos(selectedcategori)
      .then(setFeed)
      .catch((e) => setError(e));
  }, [selectedcategori, retry]);

  // #282c34

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      {/* ------sidepad for the categories----- */}
      <Paper
        square
        sx={{
          position: "sticky",
          left: "0px",
          top: "64px",
          height: { xs: "100%", md: "calc(100vh - 64px)" },
          px: { xs: 0, md: sidebarOpen ? 2 : 1 },
          zIndex: 2,
          width: { md: sidebarOpen ? 230 : 96 },
          flexShrink: 0,
          overflow: "hidden",
          transition: "width 0.2s ease, padding 0.2s ease",
        }}
      >
        <Sidebar
          selectedcategori={selectedcategori}
          setSelectedcategori={setSelectedcategori}
          collapsed={!sidebarOpen}
        />
      </Paper>

      {/* minWidth: 0 lets this flex item shrink to the viewport so the
          Shorts shelf scrolls internally instead of stretching the page */}
      <Box sx={{ flex: 1, minWidth: 0, px: 3, py: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          {selectedcategori}
          <Typography
            component="span"
            variant="inherit"
            sx={{ color: "primary.main", pl: "6px" }}
          >
            Videos
          </Typography>
        </Typography>
        {error ? (
          <ErrorState error={error} onRetry={() => setRetry((r) => r + 1)} />
        ) : (
          <>
            {/* ----------------   Shorts shelf (kept separate from the grid) ---------------- */}
            <Shortsshelf shorts={feed?.shorts} />
            {/* ----------------   Video feed main section ---------------- */}
            <Videos videos={feed?.videos} addButtton={true} />
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;

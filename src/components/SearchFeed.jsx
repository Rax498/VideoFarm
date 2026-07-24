import React from "react";
import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Videos, Shortsshelf, ErrorState } from "./";
import fetchFeedVideos from "../utils/fetchFeed";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchterm } = useParams();
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    setFeed(null);
    setError(null);
    fetchFeedVideos(searchterm)
      .then(setFeed)
      .catch((e) => setError(e));
  }, [searchterm, retry]);

  return (
    <Stack
      className="sidepad"
      sx={{
        flexDirection: { sx: "column", md: "row" },
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          overflowY: "hidden",
          minWidth: 0,
          maxWidth: "100%",
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          <Typography
            component="span"
            variant="inherit"
            sx={{ color: "primary.main", pr: "6px" }}
          >
            Search results for
          </Typography>
          {searchterm}
        </Typography>
        {error ? (
          <ErrorState error={error} onRetry={() => setRetry((r) => r + 1)} />
        ) : (
          <>
            <Shortsshelf shorts={feed?.shorts} />
            <Videos videos={feed?.videos} />
          </>
        )}
      </Box>
    </Stack>
  );
};

export default SearchFeed;

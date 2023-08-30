import React from "react";
import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Videos } from "./";
import fetchFromAPI from "../utils/fetchfromAPI";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchterm } = useParams();
  console.log(searchterm);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);
    fetchFromAPI(`search?part=snippet&regionCode=IN&q=${searchterm}`).then(
      (data) => setVideos(data.items)
    );
  }, [searchterm]);

  return (
    <Stack
      className="sidepad"
      sx={{
        flexDirection: { sx: "column", md: "row" },
        justifyContent: "center",
      }}
    >
      <Box p={2} sx={{ overflowY: "hidden" }}>
        <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
          <span style={{ color: "orange", paddingLeft: "2px" }}>
            Search results for{" "}
          </span>
          {searchterm}
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default SearchFeed;

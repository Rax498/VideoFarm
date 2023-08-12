import React from "react";
import { useState, useEffect } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import { Sidebar, Videos } from "./";
import fetchFromAPI from "../utils/fetchfromAPI";

const Feed = () => {
  const [videos, setVideos] = useState(null);
  const [selectedcategori, setSelectedcategori] = useState("New");
  // ---------------------------  fetching details based on selected caterori ---------------------
  useEffect(() => {
    setVideos(null);
    fetchFromAPI(`search?part=snippet&q=${selectedcategori}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedcategori]);

  // #282c34

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      {/* ------sidepad for the categories----- */}
      <Paper
        sx={{
          position: "sticky",
          left: "0px",
          top: "10.2vh",
          height: { xs: "100%", md: "91vh" },
          px: { xs: 0, md: 2 },
          zIndex: 2,
        }}
      >
        <Sidebar
          selectedcategori={selectedcategori}
          setSelectedcategori={setSelectedcategori}
        />
      </Paper>

      <Box p={2}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {selectedcategori}{" "}
          <span style={{ color: "orange", paddingLeft: "2px" }}>Videos</span>
        </Typography>
        {/* ----------------------   Video feed main section ---------------- */}
        <Videos videos={videos} addButtton={true} />
      </Box>
    </Stack>
  );
};

export default Feed;

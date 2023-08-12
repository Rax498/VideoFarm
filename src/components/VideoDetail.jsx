import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Paper } from "@mui/material";

import { Loader, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchfromAPI";

const VideoDetail = () => {
  const [videodetail, setvideodetail] = useState(null);
  const [relatedvideo, setRelatedvideo] = useState(null);

  const colorPallet_1 = (theme) => theme.palette.primary.light;
  const colorPallet_2 = (theme) => theme.palette.primary.dark;

  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setvideodetail(data.items[0]);
    });

    fetchFromAPI(`search?part=snippet&relatedvideoId=${id}&type=video`).then(
      (data) => {
        setRelatedvideo(data.items);
      }
    );
  }, [id]);

  {
    if (!videodetail?.snippet) return <Loader />;
  }
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videodetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1} padding={2} Height="80vh">
          <Paper
            // variant="outlined"
            elevation={20}
            sx={{ width: "100%", position: "sticky", top: "100px" }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            <Typography
              color={colorPallet_1}
              fontSize="15px"
              fontWeight="bold"
              p={1}
            >
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "white" }}
              py={0}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  fontSize="15px"
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color={colorPallet_2}
                >
                  {channelTitle}
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" color={colorPallet_2}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ color: colorPallet_2 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={relatedvideo} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;

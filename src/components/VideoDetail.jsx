import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Paper } from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

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

  const viewConverter = (viewCount) => {
    if (viewCount >= 1000000) {
      return (viewCount / 1000000).toFixed(1) + "M";
    } else if (viewCount >= 1000) {
      return (viewCount / 1000).toFixed(1) + "K";
    } else {
      return viewCount.toString();
    }
  };

  return (
    <Box minHeight="95vh" justifyContent="center">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box
          flex={1}
          p={1}
          sx={{
            height: {
              md: "85vh",
              xs: "40vh",
            },
            position: { lg: "sticky", md: "sticky", xs: "static" },
            top: "100px",
            pb: 1,
          }}
        >
          <Paper elevation={5}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              playing
              autofocus
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: { md: "18px", xs: "12px" } }}
                    color={colorPallet_2}
                  >
                    {channelTitle}
                  </Typography>
                  <VerifiedIcon
                    style={{
                      color: "goldenrod",
                      width: 15,
                      marginLeft: 4,
                      paddingTop: "4px",
                    }}
                  />
                </Box>
              </Link>
              <Stack direction="row" gap="10px" alignItems="center" pb={1}>
                <Typography variant="body2" color={colorPallet_2}>
                  {viewConverter(viewCount)} views
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: colorPallet_2, paddingTop: "4px" }}
                  >
                    {/* {parseInt(likeCount).toLocaleString()} */}
                    {viewConverter(likeCount)}
                  </Typography>
                  <ThumbUpIcon
                    style={{
                      color: "goldenrod",
                      width: 16,
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          display="flex"
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

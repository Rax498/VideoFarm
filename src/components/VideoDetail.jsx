import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayerModule from "react-player";
import { Typography, Box, Stack, Paper, Skeleton } from "@mui/material";

// react-player 2.x is CommonJS; Vite's optimizer can hand back the raw
// exports object instead of the component, so unwrap defensively
const ReactPlayer = ReactPlayerModule.default ?? ReactPlayerModule;

import {
  Verified as VerifiedIcon,
  ThumbUp as ThumbUpIcon,
} from "@mui/icons-material";

import { Loader, Videos, ErrorState } from "./";
import { fetchFromAPI } from "../utils/fetchfromAPI";
import decodeHtml from "../utils/decodeHtml";

// Loading placeholder shaped like the real page: player + title on the
// left, related-videos rail on the right
const PlayerPageSkeleton = () => (
  <Box sx={{ px: { xs: 1, md: 3 }, py: 2, minHeight: "95vh" }}>
    <Stack direction={{ xs: "column", md: "row" }} gap={3}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}
        />
        <Skeleton animation="wave" sx={{ mt: 2, fontSize: 16, width: "70%" }} />
        <Skeleton animation="wave" sx={{ fontSize: 14, width: "40%" }} />
      </Box>
      <Box sx={{ width: { xs: "100%", md: 360 }, flexShrink: 0 }}>
        <Loader count={3} />
      </Box>
    </Stack>
  </Box>
);

const VideoDetail = () => {
  const [videodetail, setvideodetail] = useState(null);
  const [relatedvideo, setRelatedvideo] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  const colorPallet_1 = (theme) => theme.palette.primary.light;
  const colorPallet_2 = (theme) => theme.palette.primary.dark;

  const { id } = useParams();

  useEffect(() => {
    setvideodetail(null);
    setRelatedvideo(null);
    setError(null);
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setvideodetail(data.items[0]);
      })
      .catch((e) => setError(e));
  }, [id, retry]);

  // the API's relatedvideoId param no longer works, so find related
  // content by searching for the video's title once it loads
  useEffect(() => {
    const title = videodetail?.snippet?.title;
    if (!title) return;
    fetchFromAPI(
      `search?part=snippet&type=video&q=${encodeURIComponent(title)}`
    ).then((data) =>
      setRelatedvideo(
        (data.items || []).filter((v) => v.id?.videoId && v.id.videoId !== id)
      )
    );
  }, [videodetail, id]);

  if (error)
    return (
      <ErrorState error={error} onRetry={() => setRetry((r) => r + 1)} />
    );
  if (!videodetail?.snippet) return <PlayerPageSkeleton />;

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
    <Box sx={{ px: { xs: 1, md: 3 }, py: 2, minHeight: "95vh" }}>
      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        {/* ---------------- player column ---------------- */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            alignSelf: "flex-start",
            position: { md: "sticky" },
            top: { md: "80px" },
          }}
        >
          <Paper variant="outlined" sx={{ overflow: "hidden" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              playing
            />

            <Typography
              color={colorPallet_1}
              fontSize="16px"
              fontWeight={600}
              px={2}
              pt={2}
              pb={1}
            >
              {decodeHtml(title)}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
              px={2}
              pb={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Stack direction="row" alignItems="center">
                  <Typography
                    sx={{ fontSize: { md: "16px", xs: "13px" } }}
                    color={colorPallet_2}
                    fontWeight={600}
                  >
                    {channelTitle}
                  </Typography>
                  <VerifiedIcon
                    style={{ color: "goldenrod", width: 15, marginLeft: 4 }}
                  />
                </Stack>
              </Link>
              <Stack direction="row" gap="12px" alignItems="center">
                <Typography variant="body2" color={colorPallet_2}>
                  {viewConverter(viewCount)} views
                </Typography>
                <Stack direction="row" alignItems="center" gap="4px">
                  <Typography variant="body2" color={colorPallet_2}>
                    {viewConverter(likeCount)}
                  </Typography>
                  <ThumbUpIcon style={{ color: "goldenrod", width: 16 }} />
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Box>

        {/* ---------------- related videos rail ---------------- */}
        <Box sx={{ width: { xs: "100%", md: 360 }, flexShrink: 0 }}>
          <Videos videos={relatedvideo} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;

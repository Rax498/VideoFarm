import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import { Verified as VerifiedIcon } from "@mui/icons-material";

import { Videos, ErrorState } from "./";
import fetchFromAPI from "../utils/fetchfromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState(null);
  const [channelTitle, setChannelTitle] = useState("");
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  // this API's `channels` endpoint is dead upstream, so the channel
  // header is derived from the channel's own uploads instead
  useEffect(() => {
    setVideos(null);
    setChannelTitle("");
    setError(null);
    fetchFromAPI(`search?part=snippet&channelId=${id}&order=date`)
      .then((data) => {
        setVideos(data?.items || []);
        setChannelTitle(data?.items?.[0]?.snippet?.channelTitle || "");
      })
      .catch((e) => setError(e));
  }, [id, retry]);

  if (error)
    return (
      <ErrorState error={error} onRetry={() => setRetry((r) => r + 1)} />
    );

  return (
    <Box minHeight="95vh">
      <Stack alignItems="center" gap={1.5} py={4}>
        {videos === null ? (
          <>
            <Skeleton
              variant="circular"
              animation="wave"
              width={96}
              height={96}
            />
            <Skeleton animation="wave" sx={{ fontSize: 24, width: 220 }} />
          </>
        ) : (
          <>
            <Avatar
              sx={{
                width: 96,
                height: 96,
                bgcolor: "primary.main",
                color: "#000",
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              {channelTitle.charAt(0).toUpperCase()}
            </Avatar>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Typography variant="h5" fontWeight={700}>
                {channelTitle || "Channel"}
              </Typography>
              <VerifiedIcon sx={{ color: "goldenrod", fontSize: 20 }} />
            </Stack>
          </>
        )}
      </Stack>
      <Box px={{ xs: 1, md: 3 }} pb={3}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, Channelcard } from "./";
import fetchFromAPI from "../utils/fetchfromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(
      `search?part=snippet&order=date&channelId=${id}&part=snippet%2Cid&order=date`
    ).then((data) => setVideos(data?.items));
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Channelcard channelDetail={channelDetail} />
      </Box>
      <Box m="2px">
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;

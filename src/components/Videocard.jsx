import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { add, remove } from "../store/favSlice";

import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import {
  demoChannelTitle,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
} from "../utils/constants";

const Videocard = ({ video, removeButtton }) => {
  const {
    id: { videoId },
    snippet,
  } = video;

  //  ------  colours   -------
  const colorPallet_1 = (theme) => theme.palette.primary.light;
  const colorPallet_2 = (theme) => theme.palette.primary.dark;

  const dispatch = useDispatch();
  const [togle, setTogle] = useState(false);

  const addhandler = (video) => {
    !togle ? dispatch(add(video)) : dispatch(remove(video.id.videoId));
    setTogle((prevTogle) => !prevTogle);
  };
  const removehandler = (video) => {
    dispatch(remove(video.id.videoId));
    setTogle((prevTogle) => !prevTogle);
  };

  return (
    <Card
      variant="outlined"
      className="vcard"
      sx={{
        width: "320px",
        height: 290,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* thumbnail tab  */}
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          className="tcard"
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{ width: "320px", height: "180px" }}
        />
      </Link>

      <CardContent>
        {/* Video description card  */}
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            fontSize={12}
            sx={{
              color: colorPallet_1,
              fontWeight: "bold",
            }}
          >
            {snippet?.title.slice(0, 50) || demoVideoTitle.slice(0, 50)}
          </Typography>
        </Link>
        {/* chanel description tab  */}

        <CardActions
          sx={{
            position: "absolute",
            bottom: "2px",
            width: "90%",
          }}
        >
          <Link
            to={
              snippet?.channelId
                ? `/channel/${snippet?.channelId}`
                : demoChannelUrl
            }
          >
            <Typography
              variant="body2"
              sx={{
                color: colorPallet_2,
                fontWeight: "bold",
                "&:hover": { color: "red" },
              }}
            >
              {snippet?.channelTitle.slice(0, 30) ||
                demoChannelTitle.slice(0, 50)}
            </Typography>
          </Link>
          {/* ======== adding to fav button ====== */}
          <IconButton
            sx={{
              position: "absolute",
              right: "1px",
            }}
            variant="outlined"
            size="small"
          >
            {removeButtton === true ? (
              <FavoriteIcon
                onClick={() => removehandler(video)}
                className="Remove "
              />
            ) : (
              <FavoriteIcon
                onClick={() => addhandler(video)}
                className={!togle ? "Add" : "Remove "}
              />
            )}

            {/* {!togle ? "Add" : "Remove "} */}
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Videocard;

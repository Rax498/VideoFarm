import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { add, remove } from "../store/favSlice";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VerifiedIcon from "@mui/icons-material/Verified";
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
import { Translate } from "@mui/icons-material";

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
        width: { md: "320px", sm: "320px", xs: "95vw" },
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
          sx={{
            width: { md: "320px", sm: "330px", xs: "95vw" },
            aspectRatio: 1 / 0.5,
            // height: "200px",
          }}
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
              sx={{
                fontSize: "12px",
                display: "flex",
                alignContent: "center",
                color: colorPallet_2,
                fontWeight: "bold",
                "&:hover": { color: "red" },
              }}
            >
              {snippet?.channelTitle.slice(0, 30).toUpperCase() ||
                demoChannelTitle.slice(0, 50)}
              <VerifiedIcon
                style={{
                  color: "goldenrod",
                  width: 15,
                  marginLeft: 4,
                  paddingBottom: "6.5px",
                }}
              />
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

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { add, remove } from "../store/favSlice";

import {
  Favorite as FavoriteIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
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
import decodeHtml from "../utils/decodeHtml";

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
        width: "100%",
        aspectRatio: 1 / 0.9,
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* thumbnail tab — hq720 is a sharp true-16:9 image derived from the
          video id (the API's "high" is a soft 4:3 letterboxed 480px image);
          falls back to the API url for videos without a 720p thumbnail */}
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          component="img"
          className="tcard"
          image={
            videoId
              ? `https://i.ytimg.com/vi/${videoId}/hq720.jpg`
              : snippet?.thumbnails?.high?.url
          }
          onError={(e) => {
            if (e.target.dataset.fellBack) return;
            e.target.dataset.fellBack = "1";
            e.target.src = snippet?.thumbnails?.high?.url || "";
          }}
          onLoad={(e) => {
            // ytimg serves a 120px placeholder (HTTP 200) when a video has
            // no 720p thumbnail — detect it and fall back to the API url
            if (e.target.naturalWidth >= 200 || e.target.dataset.fellBack)
              return;
            e.target.dataset.fellBack = "1";
            e.target.src = snippet?.thumbnails?.high?.url || "";
          }}
          alt={snippet?.title || "Video thumbnail"}
          loading="lazy"
          sx={{
            width: "100%",
            aspectRatio: 1 / 0.56,
            objectFit: "cover",
          }}
        />
      </Link>

      <CardContent>
        {/* Video description card  */}
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            fontSize={14}
            sx={{
              color: colorPallet_1,
              fontWeight: 600,
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {decodeHtml(snippet?.title) || demoVideoTitle.slice(0, 50)}
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
                alignItems: "center",
                color: colorPallet_2,
                fontWeight: "bold",
                transition: "color 0.2s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              {snippet?.channelTitle?.slice(0, 30) ||
                demoChannelTitle.slice(0, 50)}
              <VerifiedIcon
                style={{
                  color: "goldenrod",
                  width: 15,
                  marginLeft: 4,
                }}
              />
            </Typography>
          </Link>
          {/* ======== adding to fav button ====== */}
          <IconButton
            aria-label={
              removeButtton || togle
                ? "Remove from favourites"
                : "Add to favourites"
            }
            onClick={() =>
              removeButtton ? removehandler(video) : addhandler(video)
            }
            sx={{
              position: "absolute",
              right: "1px",
            }}
            size="small"
          >
            <FavoriteIcon
              className={removeButtton || togle ? "Remove" : "Add"}
            />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Videocard;

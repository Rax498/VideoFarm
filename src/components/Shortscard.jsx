import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import decodeHtml from "../utils/decodeHtml";

const Shortscard = ({ video }) => {
  const { id, snippet } = video;

  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: 150, md: 170 },
        flexShrink: 0,
        transition: "border-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Link to={`/video/${id.videoId}`}>
        <CardMedia
          component="img"
          className="tcard"
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title || "Short video"}
          loading="lazy"
          sx={{
            width: "100%",
            aspectRatio: "9 / 16",
            objectFit: "cover",
          }}
        />

        <Box p={1}>
          <Typography
            fontSize={13}
            sx={{
              color: (theme) => theme.palette.primary.light,
              fontWeight: 600,
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {decodeHtml(snippet?.title)}
          </Typography>
        </Box>
      </Link>
    </Card>
  );
};

export default Shortscard;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../utils/logoicon.svg";

import { IconButton, Paper, Stack, Typography } from "@mui/material";
import SearchBar from "./SearchBar.jsx";
import {
  DarkMode,
  LightMode,
  Favorite as FavoriteIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const Navbar = ({ modechange, darkmode, onMenuClick }) => {
  return (
    <Paper
      elevation={0}
      square
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        height={64}
        px={{ xs: 2, md: 3 }}
      >
        {/* ----------------- Menu + Logo ------------ */}

        <Stack direction="row" alignItems="center" gap={0.5}>
          <IconButton
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
            sx={{
              color: "text.primary",
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" aria-label="VideoFarm home">
            <Stack direction="row" alignItems="center" gap={1}>
              <img src={logo} alt="VideoFarm logo" height={32} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  display: { xs: "none", sm: "block" },
                }}
              >
                VideoFarm
              </Typography>
            </Stack>
          </Link>
        </Stack>

        {/* ------------------- Search Bar --------------- */}
        <Stack>
          <SearchBar />
        </Stack>

        {/* ----------  light/dark mode button  ------- */}

        <Stack direction="row">
          <IconButton
            onClick={modechange}
            aria-label={
              darkmode ? "Switch to light mode" : "Switch to dark mode"
            }
            sx={{ color: "primary.main" }}
          >
            {darkmode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* ------------  Favourites Button ---------- */}
          <IconButton
            component={Link}
            to="/Favourites"
            aria-label="Favourites"
            sx={{ color: "primary.main" }}
          >
            <FavoriteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Navbar;

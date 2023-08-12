import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../utils/logoicon.svg";

import { IconButton, Paper, Stack } from "@mui/material";
import SearchBar from "./SearchBar.jsx";
import { DarkMode, LightMode } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Navbar = ({ modechange }) => {
  const [newmode, setNewmode] = useState(false);

  const handler = () => {
    modechange();
    setNewmode((prevNewmode) => !prevNewmode);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 5,
      }}
    >
      <Stack direction="row" alignItems="center" py={4} px={2} height="10vh">
        {/* ----------------- Logo ------------ */}

        <Link to="/">
          <img src={logo} alt="logo" height={45} />
        </Link>

        {/* ------------------- Search Bar --------------- */}
        <Stack sx={{ ml: { md: 50, xs: 2 } }}>
          <SearchBar />
        </Stack>

        {/* _-_----------  light/Drakmode button  ------- */}

        <Stack direction="row">
          <IconButton className="theme-btn" onClick={() => handler()}>
            {newmode ? (
              <LightMode className="nav-Button " />
            ) : (
              <DarkMode className="nav-Button " />
            )}
          </IconButton>

          {/* ------------  Add to Fav Button ---------- */}
          <IconButton>
            <Link to="/Favourites">
              <FavoriteIcon className="nav-Button " />
            </Link>
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Navbar;

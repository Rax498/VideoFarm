import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";

const SearchBar = () => {
  const [searchterm, setSearchterm] = useState("");
  const navigate = useNavigate();

  const Send = (e) => {
    e.preventDefault();
    const term = searchterm.trim();
    if (!term) return;
    navigate(`/search/${encodeURIComponent(term)}`);
  };

  return (
    <Paper
      component="form"
      onSubmit={Send}
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        pl: 2,
        transition: "border-color 0.2s ease",
        "&:focus-within": { borderColor: "primary.main" },
      }}
    >
      <input
        className="search-bar"
        type="text"
        aria-label="Search videos"
        value={searchterm}
        onChange={(e) => setSearchterm(e.target.value)}
        placeholder="Search"
      />
      <IconButton
        type="submit"
        aria-label="Search"
        sx={{
          p: 1,
          color: "primary.main",
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

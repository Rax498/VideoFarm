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
    navigate(`/search/${searchterm}`);
  };

  return (
    <Paper
      component="form"
      onSubmit={Send}
      variant="outlined"
      sx={{
        justifyContent: "space-between",
        borderRadius: 10,
        pl: 2,
        mr: { xs: 2 },
      }}
    >
      <input
        className="search-bar"
        type="text"
        value={searchterm}
        onChange={(e) => setSearchterm(e.target.value)}
        placeholder="search"
      />
      <IconButton
        type="submit"
        sx={{
          p: 1,
          color: "orange",
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

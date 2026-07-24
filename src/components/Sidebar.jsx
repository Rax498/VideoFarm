import React from "react";
import { Stack, Typography } from "@mui/material";
import { categories } from "../utils/constants";
import { useTheme } from "@emotion/react";

const Sidebar = ({ selectedcategori, setSelectedcategori, collapsed }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      className={collapsed ? "sidebar-collapsed" : ""}
      sx={{
        overflowY: "auto",
        height: { xs: "auto", md: "94%" },
        flexDirection: { md: "column" },
        scrollBehavior: "smooth",
        my: { md: 2, xs: 0 },
      }}
    >
      {categories.map((categori) => {
        const selected = categori.name === selectedcategori;
        return (
          <button
            className="category-btn"
            onClick={() => {
              setSelectedcategori(categori.name);
            }}
            aria-pressed={selected}
            title={categori.name}
            style={{ "--selected-bg": theme.palette.primary.main }}
            key={categori.name}
          >
            <span
              className="category-icon"
              style={{
                color: selected ? "#000" : theme.palette.primary.main,
              }}
            >
              {categori.icon}
            </span>
            <Typography
              className="category-label"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: selected ? "#000" : "text.primary",
              }}
            >
              {categori.name}
            </Typography>
          </button>
        );
      })}
    </Stack>
  );
};

export default Sidebar;

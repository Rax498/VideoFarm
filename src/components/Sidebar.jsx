import React from "react";
import { Stack, Typography } from "@mui/material";
import { categories } from "../utils/constants";
import { useTheme } from "@emotion/react";

const Sidebar = ({ selectedcategori, setSelectedcategori }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "94%" },
        flexDirection: { md: "column" },
        scrollBehavior: "smooth",
        my: { md: 2, xs: 0 },
      }}
    >
      {categories.map((categori) => (
        <button
          className="category-btn"
          onClick={() => {
            setSelectedcategori(categori.name);
          }}
          style={{ background: categori.name === selectedcategori && "orange" }}
          key={categori.name}
        >
          <span
            style={{
              color:
                categori.name === selectedcategori
                  ? "black"
                  : theme.palette.primary.main,
              marginRight: "15px",
            }}
          >
            {categori.icon}
          </span>
          <Typography>
            <span
              style={{
                color:
                  categori.name === selectedcategori
                    ? "black"
                    : theme.palette.primary.main,
                marginRight: "10px",
              }}
            >
              {categori.name}
            </span>
          </Typography>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;

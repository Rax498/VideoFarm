import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const Loader = () => {
  const count = 6;
  const skeletonArray = new Array(count).fill(null);

  console.log(skeletonArray);
  return (
    <Grid container spacing={2} justifyContent="center">
      {skeletonArray.map((index) => {
        return (
          <Box
            key={index}
            sx={{
              width: "320px",
              height: 290,
              margin: "10px",
              padding: "5px",
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={310}
              height={150}
            />
            <Box
              sx={{
                mx: 1,
                my: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Skeleton
                item
                animation="wave"
                variant="circular"
                width={50}
                height={50}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={200}
                height={40}
              />
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
};

export default Loader;

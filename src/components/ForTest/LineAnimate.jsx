import { Box, Divider, Paper, Stack } from "@mui/material";
import React from "react";

export const LineAnimate = () => {
  return (
    <Stack
      component={Paper}
      direction="column"
      sx={{
        m: 10,
        justifyContent: "center",
        height: "300px",
        width: "300px",
        // bgcolor: "gray",
      }}
    >
      <Divider
        className="gradient"
        // sx={{
        //   //   bgcolor: "red",
        //   borderWidth: 2,
        // }}
      />
    </Stack>
  );
};

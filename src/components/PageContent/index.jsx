import { Box, Typography } from "@mui/material";
import React from "react";
import CalcStepper from "../SCA_Calculator/CalcStepper";

const PageContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        p: 5,
        borderRadius: 5,
        bgcolor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(5px)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CalcStepper />
    </Box>
  );
};

export default PageContent;

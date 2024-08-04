import * as React from "react";
import { Accordion, Box } from "@mui/material";
import ModulesBlock from "./ModulesBlock";
import AccountBlock from "./AccountBlock";
import ProjectsBlock from "./ProjectsBlock";

const LeftMenu = () => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        minWidth: "420px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        borderRadius: 5,
        bgcolor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(5px)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <AccountBlock />
      <ModulesBlock />
      {/* <ProjectsBlock /> */}
    </Box>
  );
};

export default LeftMenu;

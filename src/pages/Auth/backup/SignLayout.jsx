import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Box } from "@mui/material";


const gridContainerProps = {
  container: true,
  component: "main",
  sx: {
    display: "flex",
    justifyContent: "right",
    height: "100vh",
    backgroundImage: 'url("./media/signup_bg.jpg")',
    backgroundColor: (t) =>
      t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: "cover",
  },
};

const gridProps = {
  item: true,
  xs: 12,
  sm: 8,
  md: 5,
  component: Paper,
  elevation: 6,
  square: true,
  sx: {
    boxShadow: 3,
    minWidth: "300px",
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    bgcolor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(5px)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
};

const boxProps = {
  sx: {
    my: 8,
    mx: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://airmagistral.ru/">
        Air Magistral
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const SignLayout = () => {
  return (
    <Grid {...gridContainerProps}>
      <Grid {...gridProps}>
        <Box {...boxProps}>
          <img
            src="./media/logo_icon.svg"
            alt="Plus Icon"
            style={{
              width: "150px",
              heigth: "150px",
              background: "cover",
            }} />

          <Outlet />
        </Box>
        <Copyright />
      </Grid>
    </Grid>
  );
};

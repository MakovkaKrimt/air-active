import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Outlet,
  useLocation,
} from "react-router-dom";
import { Box, Drawer, FormControlLabel, Grow, Slide, Stack, Switch } from "@mui/material";
import { AuthIcon } from "./AuthIcon";
import { AuthCopyright } from "./AuthCopyright";
import { LottieAuthLogo } from "../../components/Lotties/LottieAuthLogo";
import { useAuthStateContext } from "../../providers/AuthProvider";
import { LottieAuthSuccess } from "../../components/Lotties/LottieAuthSuccess";
import { useAuthFormTransitStateContext } from "../../providers/AuthFormTransitProvider";
import { AuthSuccessed } from "../../components/Auth/AuthSuccessed";


const mainProps = {
  container: true,
  component: "main",
  justifyContent: "right",
  direction: 'row',
  sx: {
    height: "100dvh",
    width: "100dvw",
    backgroundImage: 'url("./media/signup_bg.jpg")',
    backgroundSize: "cover",
  }
}

const siderProps = {
  container: true,
  item: true,
  id: "side-bar",
  xs: 12,
  sm: 8,
  md: 5,
  component: Paper,
  elevation: 7,
  square: true,
  direction: "column",
  justifyContent: "flex-start",
  alignContent: 'center',
  sx: {
    bgcolor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  }
}

export const AuthLayout = () => {

  const currentLocation = useLocation();
  const authState = useAuthStateContext();
  const authTransitState = useAuthFormTransitStateContext()
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    authState.setIsAuth(prev => !prev)
  };

  React.useEffect(() => {
    authState.clearState()
    authTransitState.clearState()

  }, [currentLocation])


  return (
    <Grid {...mainProps}>
      <Grid {...siderProps}>
        {/* All content */}

        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mt={10}
          minWidth={{ xs: '300px', sm: '380px' }}
          maxWidth={{ xs: '350px', sm: '500px' }}
          p={1}
        >
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
          />

          {currentLocation.pathname !== '/auth/successed' &&
            <LottieAuthLogo />
          }

          <Outlet />


          {/* <AuthCopyright /> */}
        </Stack>
      </Grid>
    </Grid >
  );
};

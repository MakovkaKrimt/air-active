import {
  Button,
  Divider,
  Fade,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthStateContext } from "../../providers/AuthProvider";
import { useAuthFormTransitStateContext } from "../../providers/AuthFormTransitProvider";

export const AuthFormTitle = ({ formTitle }) => {
  const authState = useAuthStateContext();
  const authTransitState = useAuthFormTransitStateContext();
  const [titleTransit, setTitleTransit] = useState(false);
  const titleContainerRef = React.useRef(null);

  const transProps = {
    container: titleContainerRef.current,
    timeout: !authState.isAuth
      ? authTransitState.titleBlockTimeout.enter
      : authTransitState.titleBlockTimeout.exit,
  };

  useEffect(() => {
    if (!authState.isAuth) {
      return setTitleTransit(true);
    }
    if (authTransitState.isInputBlockExited) {
      return setTitleTransit(false);
    }
  }, [authState.isAuth, authTransitState.isInputBlockExited]);

  const handleBlockEntered = () => {
    if (!authState.isAuth) {
      authTransitState.setIsTitleBlockEntered(true);
      authTransitState.setIsTitleBlockExited(false);
    }
  };

  const handleBlockExited = () => {
    authTransitState.setIsTitleBlockEntered(false);
    authTransitState.setIsTitleBlockExited(true);
    if (!authTransitState.isFormExited) {
      authTransitState.setFormIsExited();
    }
  };

  return (
    <Stack direction="column" alignItems="center" rowGap={1}>
      <Stack
        ref={titleContainerRef}
        direction="column"
        rowGap={1}
        sx={{
          overflow: "hidden",
        }}
      >
        <Fade {...transProps} in={titleTransit}>
          <Typography textAlign="center" variant="h5">
            {formTitle}
          </Typography>
        </Fade>
        <Slide
          {...transProps}
          in={titleTransit}
          direction="left"
          onEntered={handleBlockEntered}
          onExited={handleBlockExited}
        >
          <Divider
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              borderWidth: 2,
            }}
          />
        </Slide>
      </Stack>
    </Stack>
  );
};

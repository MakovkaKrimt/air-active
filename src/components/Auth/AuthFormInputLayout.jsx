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
import { REGISTER_INPUTS } from "../../services/auth/constants/authConstants";
import { AuthFormInput } from "./AuthFormInput";
import { useAuthFormTransitStateContext } from "../../providers/AuthFormTransitProvider";
import { useAuthStateContext } from "../../providers/AuthProvider";
import { AuthFormEmailInput } from "./AuthFormEmailInput";

export const AuthFormInputLayout = ({ formInputs }) => {
  const authState = useAuthStateContext();
  const authTransitState = useAuthFormTransitStateContext();
  const inputsContainerRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const transitTimeout = !authState.isAuth
    ? authTransitState.inputBlockTimeout.enter
    : authTransitState.inputBlockTimeout.exit;

  const inputBlockHeigth = `${REGISTER_INPUTS.length * 90}px`;

  const [dividerTransit, setDividerTransit] = useState(false);
  const [inputTransit, setInputTransit] = useState(false);

  useEffect(() => {
    if (
      authTransitState.isTitleBlockEntered ||
      (authTransitState.isButtonBlockExited &&
        authState.isAuth &&
        !authTransitState.setIsTitleBlockExited)
    ) {
      setDividerTransit(true);
    }
  }, [
    authTransitState.isTitleBlockEntered,
    authTransitState.setIsButtonBlockExited,
    authState.isAuth,
  ]);

  const handleDividerEntered = () => {
    if (!authState.isAuth) {
      authTransitState.setIsInputBlockEntered(true);
      authTransitState.setIsInputBlockExited(false);
      return setInputTransit(true);
    }
    setInputTransit(false);
  };

  const handleDividerExited = () => {
    if (!authState.isAuth) {
      return;
    }
    authTransitState.setIsInputBlockEntered(false);
    return authTransitState.setIsInputBlockExited(true);
  };

  const handleInputsEntered = () => {
    setDividerTransit(false);
  };

  const handleInputsExited = () => {
    setDividerTransit(false);
  };

  return (
    <>
      <Stack
        direction="row"
        gap={1.5}
        ref={inputsContainerRef}
        sx={{
          overflow: "hidden",
          minHeight: inputBlockHeigth,
        }}
      >
        <Slide
          in={dividerTransit}
          timeout={transitTimeout}
          container={inputsContainerRef.current}
          direction="down"
          onEntered={handleDividerEntered}
          onExited={handleDividerExited}
        >
          <Divider
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              borderWidth: 1.5,
              boxShadow: "0 2px 10px rgba(255, 255, 255, 1)",
            }}
          />
        </Slide>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{
            width: "100%",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            gap={0.5}
            ref={containerRef}
            sx={{
              overflow: "hidden",
            }}
          >
            <Slide
              in={inputTransit}
              timeout={transitTimeout}
              container={containerRef.current}
              direction="right"
              onEntered={handleInputsEntered}
              onExited={handleInputsExited}
            >
              <Stack>
                {formInputs.map((item, index) => {
                  if (item === "email") {
                    return (
                      <AuthFormEmailInput
                        key={`${item}_${index}`}
                        type={item}
                      />
                    );
                  }
                  return <AuthFormInput key={`${item}_${index}`} type={item} />;
                })}
              </Stack>
            </Slide>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

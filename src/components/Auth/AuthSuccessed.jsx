import React, { useEffect, useRef, useState } from "react";
import { RegisterFooter } from "./AuthFooters";
import {
  Alert,
  Divider,
  Paper,
  Slide,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { LottieAuthLogo } from "../Lotties/LottieAuthLogo";
import { LottieAuthSuccess } from "../Lotties/LottieAuthSuccess";
import { useAuthFormTransitStateContext } from "../../providers/AuthFormTransitProvider";
import { useNavigate } from "react-router-dom";

const transitTimeout = 200;

export const AuthSuccessed = () => {
  const navigate = useNavigate();
  const [inputTransit, setInputTransit] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setInputTransit(true);
  }, []);

  const handleInputExited = () => {
    setTimeout(() => {
      //   navigate("/");
    }, 2000);
  };

  return (
    <>
      <LottieAuthSuccess />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height="400px"
        gap={2}
      >
        <Stack
          ref={containerRef}
          direction="column"
          alignItems="center"
          gap={1}
          sx={{
            height: "100%",
          }}
        >
          <Zoom in={inputTransit} timeout={transitTimeout}>
            <Typography variant="h4"> Поздравляем!</Typography>
          </Zoom>
          <Zoom
            in={inputTransit}
            style={{ transitionDelay: inputTransit ? "500ms" : "0ms" }}
            timeout={transitTimeout}
            onEntered={handleInputExited}
          >
            <Typography variant="h6">
              {" "}
              Ваша регистрация успешно завершена!
            </Typography>
          </Zoom>
        </Stack>

        {<RegisterFooter />}
      </Stack>
    </>
  );
};

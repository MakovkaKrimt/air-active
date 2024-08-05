import React, { useEffect, useState } from "react";
import {
  Alert,
  Collapse,
  Divider,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Slide,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import { FORM_LABELS } from "../../services/auth/constants/authConstants";
import AuthTooltipHelper from "./AuthTooltipHelper";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import {
  BorderLeft,
  Visibility,
  VisibilityOff,
  WidthFull,
} from "@mui/icons-material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useFormContext } from "react-hook-form";
import { LottieCheckedInput } from "../Lotties/LottieCheckedInput";
import AuthUseQueries from "../../services/auth/authUseQueries";

const { TEXTS, HELPERS } = FORM_LABELS;

export const AuthFormEmailInput = ({ type }) => {
  const {
    register,
    getFieldState,
    resetField,
    watch,
    formState: { isValid, errors },
  } = useFormContext();
  const { invalid, isDirty, error } = getFieldState(type);
  const [isEmailAlreadyExists, setIsEmailAlreadyExists] = useState(false);
  const currEmail = watch("email");
  const isEmailExistsQuery = AuthUseQueries.useCheckEmail(
    currEmail,
    !invalid,
    isDirty
  );

  if (isEmailExistsQuery.isError) {
    console.log(isEmailExistsQuery.error);
  }

  const handleReset = () => {
    resetField(type);
  };

  const commonProps = {
    ...register(type),
    id: type,
    name: type,
    error: !!errors[type],
    autoComplete: "off",
    sx: {
      width: "100%",
    },
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton aria-label="toggle reset input" onClick={handleReset}>
            <ClearOutlinedIcon />
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  return (
    <>
      {/* LABEL */}
      <Stack>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            pr: "10px",
          }}
        >
          {/* Input label */}

          {HELPERS[type] ? (
            <AuthTooltipHelper
              type={type}
              open={invalid}
              child={
                <Grid item xs>
                  <Typography
                    variant="body1"
                    color={invalid ? "primary" : "GrayText"}
                  >
                    {TEXTS[type]}
                  </Typography>
                </Grid>
              }
            ></AuthTooltipHelper>
          ) : (
            <Grid item xs>
              <Typography
                variant="body1"
                color={invalid ? "primary" : "GrayText"}
              >
                {TEXTS[type]}
              </Typography>
            </Grid>
          )}

          <LottieCheckedInput
            invalid={invalid}
            isDirty={isDirty}
            exists={isEmailExistsQuery?.data?.data.emailExists || false}
          />
        </Grid>

        {/* INPUT */}

        <Stack direction="column" gap={0.5}>
          <TextField {...commonProps}></TextField>

          {/* Error helper alerts */}

          {(invalid || isEmailExistsQuery?.data?.data.emailExists) && (
            <Fade in={true} timeout={400} mountOnEnter unmountOnExit>
              <Alert
                variant="standard"
                severity="error"
                sx={{
                  borderRadius: 2,
                  fontSize: "12px",
                  wordWrap: "break-word",
                }}
              >
                {invalid ? error.message : FORM_LABELS.VALIDATION[type].EXISTS}
              </Alert>
            </Fade>
          )}
        </Stack>
      </Stack>
    </>
  );
};

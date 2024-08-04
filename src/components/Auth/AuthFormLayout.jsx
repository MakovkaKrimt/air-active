import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_INPUTS } from "../../services/auth/constants/authConstants";
import { Divider, Stack, Link as MuiLink, Fade, Collapse, Slide, Box, Zoom, FormControlLabel, Switch } from "@mui/material";
import { AuthFormInput } from "./AuthFormInput";
import { authSchema } from "../../services/auth/validationSchema";
import Lottie from "lottie-react";
import { LottiePortal } from "../Lotties/LottiePortal";
import { useLocation } from "react-router-dom";
import { useAuthStateContext } from "../../providers/AuthProvider";
import { AuthFormTitle } from "./AuthFormTitle";
import { AuthFormInputLayout } from "./AuthFormInputLayout";
import { AuthFormButton } from "./AuthFormButton";
import { AuthFormLinkFooter } from "./AuthFormLinkFooter";
import { useAuthFormTransitStateContext } from "../../providers/AuthFormTransitProvider";


export const AuthFormLayout = ({ formInputs, formTitle, formBtnLabel, footer, handleSubmit }) => {

  const authState = useAuthStateContext();
  const authTransitState = useAuthFormTransitStateContext()
  const useFormMethods = useForm({
    mode: "all",
    resolver: yupResolver(authSchema),

  })

  // React.useEffect(() => {
  //   if (authTransitState.isMainLogoExited) {
  //     authTransitState.clearState()
  //     console.log('Завершено')
  //   }
  // }, [authTransitState.isMainLogoExited])



  const onSubmit = (data) => {
    handleSubmit(data)
  };

  return (

    <FormProvider {...useFormMethods}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        width='100%'
        rowGap={4}
      >

        {/* Header */}

        <AuthFormTitle
          formTitle={formTitle}
        />

        {/* Form */}

        < Stack
          component="form"
          noValidate
          direction='column'
          justifyContent="center"
          alignItems="stretch"
          rowGap={0.5}
          onSubmit={useFormMethods.handleSubmit(onSubmit)}
          sx={{
            width: '100%'
          }}
        >
          <AuthFormInputLayout
            formInputs={formInputs}
          />
          <AuthFormButton
            formBtnLabel={formBtnLabel}
          />
        </Stack>


        {/* Footer */}

        <AuthFormLinkFooter
          footer={footer}
        />
      </Stack >
    </FormProvider >


  );
};


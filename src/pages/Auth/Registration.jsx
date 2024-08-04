import * as React from "react";
import { FORM_LABELS, REGISTER_INPUTS } from "../../services/auth/constants/authConstants";
import { useAuthStateContext } from "../../providers/AuthProvider";
import AuthMutations from "../../services/auth/authUseMutations";
import { AuthFormLayout } from "../../components/Auth/AuthFormLayout";
import { RegisterFooter } from "../../components/Auth/AuthFooters";
import { useNavigate } from "react-router-dom";
import { useAuthFormTransitStateContext } from "../../providers/AuthFormTransitProvider";
import { Typography } from "@mui/material";
import { AuthSuccessed } from "../../components/Auth/AuthSuccessed";


const formTitle = FORM_LABELS.TITLES.REGISTER
const formBtnLabel = FORM_LABELS.BUTTONS.REGISTER


export const Registration = () => {

  const navigate = useNavigate();
  const authTransitState = useAuthFormTransitStateContext()
  const auth = useAuthStateContext();
  const mutation = AuthMutations.useRegisterUser()


  if (mutation.isError) {
    console.log(mutation.error)
  }

  const handleSubmit = (data) => {
    auth.registration(data)
  }

  React.useEffect(() => {
    if (authTransitState.isFormExited) {
      navigate('/auth/successed')
    }

  }, [authTransitState.isFormExited])


  return (
    <>
      <AuthFormLayout
        formInputs={REGISTER_INPUTS}
        formTitle={formTitle}
        formBtnLabel={formBtnLabel}
        footer={<RegisterFooter />}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalcForm from "./CalcForm";
import { CALC_LABELS } from "./formFieldData";
import { useSelector } from "react-redux";
import { isActiveBlockFilledSelector } from "../../store/SCA_Calculator/calcFormSlice";

const CalcStepper = () => {
  const isActiveBlockFilled = useSelector(isActiveBlockFilledSelector);

  const steps = ["Блок 1", "Блок 2", "Блок3", "Блок 4"];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          justifyContent: "space-between",
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>
              {CALC_LABELS.STEPPER_LABELS.RESET}
            </Button>
          </Box>
        </>
      ) : (
        <>
          <CalcForm activeStep={activeStep} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              pt: 2,
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {CALC_LABELS.STEPPER_LABELS.BACK}
            </Button>
            <Button onClick={handleNext} disabled={!isActiveBlockFilled}>
              {activeStep === steps.length - 1
                ? CALC_LABELS.STEPPER_LABELS.FINISH
                : CALC_LABELS.STEPPER_LABELS.NEXT}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CalcStepper;

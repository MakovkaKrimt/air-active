import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CalcItem from './CalcItem';
import { styled } from '@mui/system';

const steps = ['БЛОК 1', 'БЛОК 2', 'БЛОК 3', 'Результат'];


const CalcForm = () => {


    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [isFormFilled, setIsFormFilled] = React.useState(false)


    const HandleNextStepAccess = (value) => {
        setIsFormFilled(value)
    }


    const getCalcItem = (step) => {
        return <CalcItem
        />
    }

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{
        }}>
            <Typography
                variant='h6'
                sx={{
                    textAlign: 'center',
                    py: 2
                }}
            >Расчет сечения</Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {
                activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Результат
                        </Typography>
                        <CalcItem
                            onFormFilled={HandleNextStepAccess}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box
                            sx={{ my: 4 }}
                        >{getCalcItem()}</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Назад
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button
                                // disabled={isFormFilled ? true : false}
                                onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Рассчитать' : 'Вперед'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )
            }
        </Box >
    );
}


export default CalcForm
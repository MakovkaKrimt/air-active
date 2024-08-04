import { createSlice } from '@reduxjs/toolkit';

const calcStepperSlice = createSlice({
    name: 'calcStepper',
    initialState: {
        activeStep: 0,
    },
    reducers: {
        setActiveStep: (state, action) => {
            state.activeStep = action.payload;
        }
    },
});



export const { setActiveStep } = calcStepperSlice.actions;
export default calcStepperSlice.reducer;

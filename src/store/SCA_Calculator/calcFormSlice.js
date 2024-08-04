import { createSlice, createSelector } from '@reduxjs/toolkit';
import { calcFormInitState } from "./initialState"


const initialState = calcFormInitState;


const calcFormSlice = createSlice({
    name: 'calcForm',
    initialState,
    reducers: {
        setFormIsFilled: (state, action) => {
            const { payload } = action
            state.fillControl[payload.blockName] = true
        },
        setFormIsInvalid: (state, action) => {
            const { payload } = action
            state.validControl[payload.blockName] = false
        },
        setFormIsValid: (state, action) => {
            const { payload } = action
            state.validControl[payload.blockName] = true
        },
        setFormIsUnFilled: (state, action) => {
            const { payload } = action
            state.fillControl[payload.blockName] = false
        },
        setActiveBlock: (state, action) => {
            const { payload } = action
            state.activeBlockName = payload.name
        }

    },
});

export const activeBlockNameSelector = state => state.calcForm.activeBlockName

export const isActiveBlockFilledSelector = createSelector(
    state => state.calcForm,
    state => state.calcForm.activeBlockName,
    (formState, activeBlockName) => formState.fillControl[activeBlockName]
);

export const isActiveBlockValidSelector = createSelector(
    state => state.calcForm,
    state => state.calcForm.activeBlockName,
    (formState, activeBlockName) => formState.validControl[activeBlockName]
);


export const { setFormIsFilled, setFormIsUnFilled, setActiveBlock, setFormIsValid, setFormIsInvalid, setFormIsInValid } = calcFormSlice.actions;
export default calcFormSlice.reducer;











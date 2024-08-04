import { createSlice, createSelector } from '@reduxjs/toolkit';
import { networkParamsInitState, stateFieldParamsModule } from "./initialState"

const initialState = networkParamsInitState;

const networkParamsSlice = createSlice({
    name: 'networkParams',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { payload } = action
            state[payload.fieldKey] = {
                providedValue: payload.hasOwnProperty('providedValue')
                    ? payload.providedValue : state[payload.fieldKey].providedValue,
                unit: payload.hasOwnProperty('unit')
                    ? payload.unit : state[payload.fieldKey].unit,
                valueWithUnit: payload.hasOwnProperty('valueWithUnit')
                    ? payload.valueWithUnit : state[payload.fieldKey].valueWithUnit,
                calcedValue: payload.hasOwnProperty('calcedValue')
                    ? payload.calcedValue : state[payload.fieldKey].calcedValue
            }
        },
        clearField: (state, action) => {
            const { payload } = action
            state[payload.fieldKey] = stateFieldParamsModule

        },
        networkParamsResetSate: (state) => {
            Object.keys(state).forEach(key => {
                state[key] = stateFieldParamsModule;
            });
        }
    },
});


export const unfilledFieldsSelector = createSelector(
    state => state.networkParams,
    calcFirstBlock => {
        const emptyProperties = [];
        for (const property in calcFirstBlock) {
            if (calcFirstBlock[property].providedValue === '') {
                emptyProperties.push(property);
            }
        }
        return emptyProperties;
    }
);

export const lastUnfilledFieldSelector = createSelector(
    unfilledFieldsSelector,
    unfilledFields => {
        if (unfilledFields.length === 1) {
            return unfilledFields[0]
        }
    }
);

export const workStateSelector = state => state.networkParams;

export const totalStateSelector = createSelector(
    workStateSelector,
    workState => {
        const totalState = Object.entries(workState).reduce((acc, [key, val]) => {
            val.calcedValue
                ? acc[key] = val.calcedValue
                : acc[key] = val.valueWithUnit
            return acc
        }, {});
        return totalState
    }
);

export const totalVoltageSelector = createSelector(
    totalStateSelector,
    totalState => totalState.voltage
)


export const { updateField, clearField, networkParamsResetSate, } = networkParamsSlice.actions;
export default networkParamsSlice.reducer;











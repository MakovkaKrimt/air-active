import { createSlice, createSelector } from '@reduxjs/toolkit';
import { voltageRangeInitState, stateFieldParamsModule, invalidDataUnit } from "./initialState"


const initialState = voltageRangeInitState;


const voltageRangeSlice = createSlice({
    name: 'voltageRange',
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
        updateFields: (state, action) => {
            const { payload } = action;
            Object.keys(payload).forEach(fieldKey => {
                state[fieldKey] = {
                    providedValue: payload[fieldKey].hasOwnProperty('providedValue')
                        ? payload[fieldKey].providedValue : state[fieldKey].providedValue,
                    unit: payload[fieldKey].hasOwnProperty('unit')
                        ? payload[fieldKey].unit : state[fieldKey].unit,
                    valueWithUnit: payload[fieldKey].hasOwnProperty('valueWithUnit')
                        ? payload[fieldKey].valueWithUnit : state[fieldKey].valueWithUnit,
                    calcedValue: payload[fieldKey].hasOwnProperty('calcedValue')
                        ? payload[fieldKey].calcedValue : state[fieldKey].calcedValue
                };
            });
        },
        setInvalidField: (state, action) => {
            const { payload } = action;
            state.invalidData.fieldName = payload.fieldName
            state.invalidData.fieldValue = payload.fieldValue

        },
        voltageRangeResetState: (state) => {
            Object.keys(state).forEach(key => {
                if (key !== 'invalidData') {
                    state[key] = stateFieldParamsModule
                } else {
                    state[key] = { ...invalidDataUnit }
                };
            });
        }

    },
});

// export const invalidFieldSelector = state => state.voltageRange

export const invalidFieldSelector = createSelector(
    state => state.voltageRange,
    voltageRange => voltageRange.invalidData,
);

export const unfilledFieldSelector = createSelector(
    state => state.voltageRange,
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

export const filledFieldSelector = createSelector(
    state => state.voltageRange,
    calcFirstBlock => {
        const filledPropety = [];
        for (const property in calcFirstBlock) {
            if (calcFirstBlock[property].providedValue !== '') {
                filledPropety.push(
                    property,
                    calcFirstBlock[property].providedValue
                )
            }
        }
        return filledPropety;
    }
);


export const selectAllState = state => state.voltageRange;

export const { updateField, updateFields, setInvalidField, voltageRangeResetState } = voltageRangeSlice.actions;
export default voltageRangeSlice.reducer;











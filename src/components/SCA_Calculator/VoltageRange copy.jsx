
import { BLOCK_NAMES, CALC_LABELS, voltageRangeFormFieldData } from './formFieldData'
import { roundFloatValue } from '../../utils'
import store from '../../store/store';
import { updateField, clearField, selectUnfilledFields, selectAllState, selectLastUnfilledField } from '../../store/SCA_Calculator/voltageRangeSlice';
import { setFormIsFilled, setFormIsUnFilled } from '../../store/SCA_Calculator/calcFormSlice';
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormControl, IconButton, MenuItem, Paper, Select, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

const FormStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: 2
}

const BLOCK_NAME = BLOCK_NAMES.VOLTAGE_RANGE
const { INFO } = CALC_LABELS.FIELDS_LABELS

export const VoltageRange = () => {


    const blockName = BLOCK_NAMES.VOLTAGE_RANGE

    const currentBlockState = useSelector(selectAllState);
    const unfilledFields = useSelector(selectUnfilledFields)
    const lastUnfilledField = useSelector(selectLastUnfilledField)
    const dispatch = useDispatch();

    console.log(currentBlockState)

    useEffect(() => {
        if (lastUnfilledField) {
            dispatch(setFormIsFilled({ blockName }))
        } else {
            dispatch(setFormIsUnFilled({ blockName }))
        }
    }, [unfilledFields])


    const dispatchCalcedField = (fieldKey) => {

        const currentState = store.getState().networkParams;
        let calcedValue
        switch (fieldKey) {
            case 'voltage':
                calcedValue = Number(
                    currentState.power.valueWithUnit / currentState.current.valueWithUnit
                )
                break;
            case 'current':
                calcedValue = Number(
                    currentState.power.valueWithUnit / currentState.voltage.valueWithUnit
                )
                break;
            case 'power':
                calcedValue = Number(
                    currentState.voltage.valueWithUnit * currentState.current.valueWithUnit
                )
                break;
        }

        if (!Number.isInteger(calcedValue)) calcedValue = roundFloatValue(calcedValue)

        const payload = {
            fieldKey,
            unit: '',
            calcedValue
        };
        dispatch(updateField(payload));
    }

    const handleInputChange = (fieldKey, passedValue) => {

        const { unit } = currentBlockState[fieldKey];
        const payload = {
            fieldKey,
            providedValue: passedValue === '' ? '' : +passedValue,
            valueWithUnit: !passedValue ? '' : !unit ? +passedValue : unit * +passedValue
        };

        dispatch(updateField(payload));
        if (unfilledFields.length == 2 && unfilledFields.includes(fieldKey)) {
            const emptyFieldName = unfilledFields.filter(item => item !== fieldKey)[0];
            return dispatchCalcedField(emptyFieldName)
        }

        lastUnfilledField && dispatchCalcedField(lastUnfilledField)

    }

    const handleUnitChange = (fieldKey, passedVal) => {

        const { providedValue } = currentBlockState[fieldKey];
        let valWithUnit = '';
        if (!passedVal) {
            valWithUnit = providedValue;

        } else if (providedValue) {
            valWithUnit = Number(providedValue * +passedVal);
            if (!Number.isInteger(valWithUnit)) {
                valWithUnit = roundFloatValue(valWithUnit);
            }
        }
        const payload = {
            fieldKey,
            unit: passedVal === '' ? '' : +passedVal,
            valueWithUnit: valWithUnit !== '' ? valWithUnit : providedValue
        };

        dispatch(updateField(payload));
        if (unfilledFields.length == 2 && unfilledFields.includes(fieldKey)) {
            const emptyFieldName = unfilledFields.filter(item => item !== fieldKey)[0];
            return dispatchCalcedField(emptyFieldName)
        }

        lastUnfilledField && dispatchCalcedField(lastUnfilledField)
    };

    const handleClearField = (fieldKey) => {
        dispatch(clearField({ fieldKey }));
    }


    return (
        <Box
            sx={{
                display: 'flex',
                mt: 2,
                minWidth: '600px',
                flexDirection: 'column',
                gap: '8px'
            }}
        >
            {voltageRangeFormFieldData.map((item, index) => {
                return (

                    <FormControl sx={FormStyle}>
                        {(currentBlockState[Object.keys(item)].providedValue && lastUnfilledField !== Object.keys(item)[0])
                            ? <IconButton
                                variant='outlined'
                                onClick={() => handleClearField(Object.keys(item)[0])}
                            ><CloseIcon color='error' /></IconButton>
                            : <Box sx={{ minWidth: '40px', minHeight: '40px' }}
                            ></Box>
                        }
                        <TextField
                            sx={{ flex: 1 }}
                            type='number'
                            label={Object.values(item)[0].input.label}
                            value={
                                lastUnfilledField == Object.keys(item)[0]
                                    ? currentBlockState[Object.keys(item)].calcedValue
                                    : currentBlockState[Object.keys(item)].providedValue
                            }
                            disabled={
                                lastUnfilledField == Object.keys(item)[0]
                                    ? true
                                    : false
                            }
                            onChange={e => handleInputChange(Object.keys(item)[0], e.target.value)}

                            helperText={
                                currentBlockState[Object.keys(item)].valueWithUnit
                                    ? `Введенное значение: ${currentBlockState[Object.keys(item)].valueWithUnit} ${Object.values(item)[0].select[0].fullLabel}`
                                    : lastUnfilledField !== Object.keys(item)[0]
                                        ? ''
                                        : `Рассчитанное значение: ${currentBlockState[Object.keys(item)].calcedValue} ${Object.values(item)[0].select[0].fullLabel}`

                            }
                        >
                        </TextField>
                        <Select
                            sx={{ flex: 1, textAlign: 'center' }}
                            fullWidth
                            size='medium'
                            value={currentBlockState[Object.keys(item)].unit}
                            onChange={e => handleUnitChange(Object.keys(item), e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {Object.values(item)[0].select.map((obj, index) => {
                                return (
                                    <MenuItem
                                        key={`${obj.value} ${index}`}
                                        value={obj.value}
                                    >{obj.combinedLabel}
                                    </MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                )
            })}
        </Box >
    )




}



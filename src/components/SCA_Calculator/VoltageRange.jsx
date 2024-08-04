import { CALC_LABELS, BLOCK_NAMES, voltageRangeFormFieldData, BLOCK_FIELD_NAMES, FIELD_CALC_PARAMS, BLOCK_PROPS, formFieldCalcDataUnit } from './formFieldData'
import { roundFloatValue } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useLayoutEffect, useState } from 'react';
import { setFormIsFilled, setFormIsUnFilled, setFormIsInvalid, setFormIsValid } from '../../store/SCA_Calculator/calcFormSlice';
import { selectAllState, updateFields, filledFieldSelector, unfilledFieldSelector, invalidFieldSelector, setInvalidField } from '../../store/SCA_Calculator/voltageRangeSlice';
import { totalVoltageSelector } from '../../store/SCA_Calculator/networkParamsSlice';
import { ErrorOutlineOutlined, InfoOutlined, WarningAmberOutlined } from '@mui/icons-material';


const BLOCK_NAME = BLOCK_NAMES.VOLTAGE_RANGE
const { INFO, ERROR } = CALC_LABELS.FIELDS_LABELS

export const VoltageRange = () => {


    const currentBlockState = useSelector(selectAllState);
    const unfilledFields = useSelector(unfilledFieldSelector)
    const [filledFieldName, filledFieldValue] = useSelector(filledFieldSelector)
    const voltage = useSelector(totalVoltageSelector)
    const invalidFieldData = useSelector(invalidFieldSelector)
    const dispatch = useDispatch();

    const invalidFieldName = invalidFieldData.fieldName
    const invalidFieldValue = invalidFieldData.fieldValue


    useEffect(() => {
        if (!invalidFieldName) {
            dispatch(setFormIsValid({ blockName: BLOCK_NAME }))
        } else {
            dispatch(setFormIsInvalid({ blockName: BLOCK_NAME }))
        }
    }, [invalidFieldData])


    useEffect(() => {
        if (unfilledFields.length === 2 && !(invalidFieldName !== '')) {
            dispatch(setFormIsFilled({ blockName: BLOCK_NAME }))
        } else {
            dispatch(setFormIsUnFilled({ blockName: BLOCK_NAME }))
        }
    }, [unfilledFields])

    useEffect(() => {
        if (unfilledFields.length === 2) {
            const check = checkCalcValidation(filledFieldName, filledFieldValue)
            if (check) {
                getCalcedFieldsData(
                    filledFieldName,
                    unfilledFields,
                    filledFieldValue
                )
            }
        }
    }, [voltage])



    const checkCalcValidation = (fieldKey, measuredVal) => {

        if ((fieldKey === BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION && measuredVal !== '' && (voltage < measuredVal))
            || (fieldKey === BLOCK_FIELD_NAMES.MIN_VOLTAGE && measuredVal !== '' && (voltage < measuredVal))
            || (fieldKey === BLOCK_FIELD_NAMES.MAX_VOLTAGE && measuredVal !== '' && (voltage > measuredVal))) {
            const payload = {
                key: 'invalidField',
                fieldName: fieldKey,
                fieldValue: measuredVal
            }
            dispatch(setInvalidField(payload))
            clearCalcedFields(unfilledFields)
            return false
        }

        const payload = {
            key: 'invalidField',
            fieldName: '',
            fieldValue: ''
        }
        dispatch(setInvalidField(payload))
        return true
    }

    const clearCalcedFields = (fieldsToCalc) => {
        let calcPayload = {}
        fieldsToCalc.forEach(item => {
            calcPayload[item] = {
                [FIELD_CALC_PARAMS.PASSED_VAL]: '',
                [FIELD_CALC_PARAMS.MEASURED_VAL]: '',
                [FIELD_CALC_PARAMS.CALCED_VAL]: '',
            }
        })
        dispatch(updateFields(calcPayload))
    }

    const handleInputChange = (fieldKey, passedValue) => {

        const unit = currentBlockState[fieldKey][FIELD_CALC_PARAMS.MEASURE_UNIT];

        const passedVal = passedValue === '' ? '' : +passedValue
        const measuredVal = !passedValue ? '' : !unit ? +passedValue : unit * +passedValue

        checkCalcValidation(fieldKey, measuredVal)

        const payload = {
            [fieldKey]: {
                [FIELD_CALC_PARAMS.PASSED_VAL]: passedVal,
                [FIELD_CALC_PARAMS.MEASURED_VAL]: measuredVal
            }
        }
        dispatch(updateFields(payload))

        const fieldsToCalc = BLOCK_PROPS[BLOCK_NAME].filter(item => item !== fieldKey)

        if (passedVal) {
            getCalcedFieldsData(fieldKey, fieldsToCalc, measuredVal)
        }
        else {
            clearCalcedFields(fieldsToCalc)
        }

    }

    const getCalcedFieldsData = (fieldKey, calcedFields, measuredVal) => {

        let payload = {}

        calcedFields.forEach((item) => {
            let calcedValue
            switch (fieldKey) {
                case BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION:
                    item === BLOCK_FIELD_NAMES.MIN_VOLTAGE
                        ? calcedValue = voltage - measuredVal
                        : calcedValue = voltage + measuredVal
                    break

                case BLOCK_FIELD_NAMES.MIN_VOLTAGE:
                    item === BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION
                        ? calcedValue = voltage - measuredVal
                        : calcedValue = voltage * 2 - measuredVal
                    break

                case BLOCK_FIELD_NAMES.MAX_VOLTAGE:
                    item === BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION
                        ? calcedValue = measuredVal - voltage
                        : calcedValue = voltage * 2 - measuredVal
                    break

                default:
                    break;
            }

            if (calcedValue === '') {
                calcedValue = 0
            } else {
                if (!Number.isInteger(calcedValue)) {
                    calcedValue = roundFloatValue(calcedValue)
                }
            }

            payload[item] = {
                [FIELD_CALC_PARAMS.PASSED_VAL]: '',
                [FIELD_CALC_PARAMS.MEASURED_VAL]: '',
                [FIELD_CALC_PARAMS.CALCED_VAL]: calcedValue
            };
        })
        dispatch(updateFields(payload))
    }



    const handleUnitChange = (fieldKey, passedVal) => {


        const providedValue = currentBlockState[fieldKey][FIELD_CALC_PARAMS.PASSED_VAL];
        let measuredVal = '';
        if (!passedVal) {
            measuredVal = providedValue;

        } else if (providedValue) {
            measuredVal = Number(providedValue * +passedVal);
            if (!Number.isInteger(measuredVal)) {
                measuredVal = roundFloatValue(measuredVal);
            }
        }

        checkCalcValidation(fieldKey, measuredVal)


        const payload = {
            [fieldKey]: {
                [FIELD_CALC_PARAMS.MEASURE_UNIT]: passedVal,
                [FIELD_CALC_PARAMS.MEASURED_VAL]: measuredVal
            }
        }

        const fieldsToCalc = BLOCK_PROPS[BLOCK_NAME].filter(item => item !== fieldKey)

        dispatch(updateFields(payload))

        if (providedValue) {
            getCalcedFieldsData(fieldKey, fieldsToCalc, measuredVal)
        }
        else {
            let calcPayload = {}
            fieldsToCalc.forEach(item => {
                calcPayload[item] = { [FIELD_CALC_PARAMS.CALCED_VAL]: '' }
            })
            dispatch(updateFields(calcPayload))
        }


    };

    const handleClearField = (fieldKey) => {
        handleInputChange(fieldKey, '')
    }

    const getHelperText = (fieldName, fieldSelectData, measuredVal, calcedValue, invalidValue) => {

        if (fieldName === invalidFieldName) {
            let message
            // let message = `${ERROR.INVALID_INPUT.MAIN} ${invalidValue} Вольт [В] \n`
            switch (fieldName) {
                case BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION:
                    message =
                        `${ERROR.INVALID_INPUT[fieldName].START}: ${voltage} Вольт [В] \n${ERROR.INVALID_INPUT[fieldName].END}`
                    break;
                case BLOCK_FIELD_NAMES.MIN_VOLTAGE:
                    message =
                        `${ERROR.INVALID_INPUT[fieldName].START}: ${voltage} Вольт [В] \n${ERROR.INVALID_INPUT[fieldName].END}`
                    break;
                case BLOCK_FIELD_NAMES.MAX_VOLTAGE:
                    message =
                        `${ERROR.INVALID_INPUT[fieldName].START}: ${voltage} Вольт [В] \n${ERROR.INVALID_INPUT[fieldName].END}`
                    break;
                default:
                    break;
            }
            return message
        }

        if (measuredVal !== '') {
            return (
                `${INFO.PASSED_VALUE} ${measuredVal} ${fieldSelectData.fullLabel}`
            );
        }
        if (calcedValue !== '') {
            return (
                `${INFO.CALCED_VALUE} ${calcedValue} ${fieldSelectData.fullLabel}`
            );
        }

        return (

            `${INFO.DEFAULT[fieldName]} ${voltage}` || ''
        );
    }


    return (
        <Box
            sx={{
                display: 'flex',
                mt: 2,
                minWidth: '600px',
                flexDirection: 'column',
                gap: 3
            }}
        >
            <Typography
                variant='subtitle2'
                sx={{
                    pb: 1,
                    color: 'grey'
                }}
            >
                Ранее указанное напряжение: {voltage} Вольт [В]
            </Typography>

            {voltageRangeFormFieldData.map((item, index) => {

                const fieldName = Object.keys(item)[0]
                const fieldCalcData = currentBlockState[fieldName]
                const fieldInputData = Object.values(item)[0].input
                const fieldSelectData = Object.values(item)[0].select

                const passedValue = fieldCalcData[FIELD_CALC_PARAMS.PASSED_VAL]
                const measuredValue = fieldCalcData[FIELD_CALC_PARAMS.MEASURED_VAL]
                const calcedValue = fieldCalcData[FIELD_CALC_PARAMS.CALCED_VAL]

                console.log(fieldInputData)

                return (
                    <FormControl
                        error={
                            fieldName === invalidFieldName
                        }
                        key={`${index}_fc`}
                        sx={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'space-between',
                                gap: 1,
                                mb: index === 0 ? 3 : 0
                            }
                        }
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex: 1,
                                justifyContent: 'space-between',
                                gap: 1,
                                width: '100%'
                            }}
                        >
                            {
                                (passedValue && !calcedValue)
                                    ? <IconButton
                                        variant='outlined'
                                        onClick={() => handleClearField(fieldName)}
                                    ><CloseIcon color='error' /></IconButton>
                                    : <Box sx={{ minWidth: '40px', minHeight: '40px' }}
                                    ></Box>
                            }
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    gap: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'start',
                                        gap: 1
                                    }}

                                >
                                    <Typography
                                        variant='subtitle'
                                        disabled={calcedValue !== ''}
                                    >{fieldInputData.label}</Typography>
                                    {
                                        calcedValue !== '' &&
                                        <Typography
                                            variant='subtitle'
                                            color='primary'
                                        >(рассчетное)</Typography>
                                    }
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flex: 1,
                                        gap: 2
                                    }}
                                >
                                    <TextField
                                        key={`${index}_tf`}
                                        sx={{
                                            flex: 1,
                                        }}
                                        fullWidth
                                        type='number'
                                        error={fieldName === invalidFieldName}
                                        value={
                                            invalidFieldName && fieldName !== invalidFieldName
                                                ? ''
                                                : calcedValue !== '' ? calcedValue : passedValue
                                        }
                                        disabled={calcedValue !== ''}
                                        onChange={e => handleInputChange(fieldName, e.target.value)}

                                        InputProps={{
                                            sx: {
                                                color: fieldName === invalidFieldName
                                                    ? (theme) => theme.palette.primary.main : 'primary',
                                            },
                                            startAdornment: index === 0
                                                ? <InputAdornment position="start">
                                                    {'+- '}
                                                </InputAdornment>
                                                : ''
                                        }}
                                    >
                                    </TextField>
                                    <Select
                                        key={fieldInputData.label}
                                        disabled={calcedValue !== ''}
                                        sx={{
                                            flex: 1,
                                            textAlign: 'center',
                                            maxWidth: '200px'
                                        }}
                                        fullWidth
                                        size='medium'
                                        value={fieldCalcData[FIELD_CALC_PARAMS.MEASURE_UNIT]}
                                        onChange={e => handleUnitChange(fieldName, e.target.value)}
                                        displayEmpty
                                        inputProps={{
                                            'aria-label': 'Without label',
                                            sx: {
                                                color: fieldName === invalidFieldName
                                                    ? (theme) => theme.palette.primary.main : 'primary',
                                            },
                                        }}
                                    >
                                        {fieldSelectData.map((selectItem, index) => {
                                            return (
                                                <MenuItem
                                                    key={`${selectItem.value} ${index}`}
                                                    value={selectItem.value}
                                                >{selectItem.combinedLabel}
                                                </MenuItem>
                                            )

                                        })}

                                    </Select>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                pl: 6

                            }}
                        >
                            {invalidFieldName && fieldName !== invalidFieldName
                                ? ''
                                : invalidFieldName === fieldName
                                    ? <Typography
                                        color='primary'
                                        variant='h4'
                                    // sx={{
                                    //     color: (theme) => theme.palette.primary.main
                                    // }}
                                    >!</Typography>
                                    // ? <ErrorOutlineOutlined
                                    //     fontSize="small"
                                    //     color="primary" />
                                    : passedValue !== '' || calcedValue !== ''
                                        ? <InfoOutlined
                                            fontSize="small"
                                            color={calcedValue !== '' ? 'disabled' : 'secondary'}
                                        />
                                        : ''
                            }

                            <FormHelperText
                                sx={{
                                    flex: 1,
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {!(invalidFieldName && fieldName !== invalidFieldName)
                                    ? getHelperText(
                                        fieldName
                                        , fieldSelectData[0]
                                        , measuredValue
                                        , calcedValue
                                        , invalidFieldValue
                                    )
                                    : ''}
                            </FormHelperText>

                        </Box>
                    </FormControl>
                )
            })}
        </Box >
    )
}





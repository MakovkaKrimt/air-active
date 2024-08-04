import React, { useEffect, useState } from 'react'
import { NetworkParams } from './NetworkParams';
import { useDispatch, useSelector } from 'react-redux'
import { isActiveBlockFilledSelector, isActiveBlockValidSelector, activeBlockNameSelector, setActiveBlock } from '../../store/SCA_Calculator/calcFormSlice';
import { networkParamsResetSate } from '../../store/SCA_Calculator/networkParamsSlice'
import { voltageRangeResetState } from '../../store/SCA_Calculator/voltageRangeSlice';
import { Box, Button, Divider, FormHelperText, Paper, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { VoltageRange } from './VoltageRange';
import { BLOCK_NAMES, CALC_LABELS } from './formFieldData';


const { RESET, ERROR, HEADERS } = CALC_LABELS.FORM_LABELS

const CalcForm = ({ activeStep }) => {


    const activeBlockName = useSelector(activeBlockNameSelector)
    const isActiveBlockFilled = useSelector(isActiveBlockFilledSelector)
    const isActiveBlockValid = useSelector(isActiveBlockValidSelector)

    const dispatch = useDispatch();


    useEffect(() => {
        console.log('Переход на новую страницу')
    }, [activeBlockName]);



    useEffect(() => {
        switch (activeStep) {
            case 0: {
                dispatch(setActiveBlock({ name: BLOCK_NAMES.NETWORK_PARAMS }))
                break
            }
            case 1: {
                dispatch(setActiveBlock({ name: BLOCK_NAMES.VOLTAGE_RANGE }))
                break
            }
            default:
                break
        }
    }, [activeStep]);


    const renderFieldsBlock = () => {
        switch (activeStep) {
            case 0:
                return <NetworkParams />
            case 1:
                return <VoltageRange />
            default:
                return <NetworkParams />
        }
    }

    const handleResetForm = () => {

        switch (activeStep) {
            case 0:
                dispatch(networkParamsResetSate())
                break
            case 1:
                dispatch(voltageRangeResetState())
                break
            default:
                break
        }
    }



    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                gap: 2
            }}
        >
            <Typography>{HEADERS[activeBlockName]}</Typography>
            <Divider></Divider>

            {renderFieldsBlock()}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "start",
                    pl: 8
                }}
            >
                {!isActiveBlockFilled && isActiveBlockValid && (
                    <FormHelperText
                        error
                    >
                        {ERROR[activeBlockName]}
                    </FormHelperText>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "end",
                }}
            >
                <Button
                    startIcon={<CloseIcon></CloseIcon>}
                    color='secondary'
                    variant='contained'
                    onClick={handleResetForm}
                >
                    {RESET}
                </Button>
            </Box>
        </Box>
    )
}

export default CalcForm

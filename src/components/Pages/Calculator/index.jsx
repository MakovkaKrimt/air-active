import { Box, Grid, Paper, styled } from '@mui/material';
import React from 'react'
import CalcForm from './CalcForm';


const Calculator = () => {
    return (
        <Box
            sx={{
                flex: 1,
                p: 2,
                borderRadius: 5,

            }}
        >
            <CalcForm />
        </Box>

    )

}

export default Calculator
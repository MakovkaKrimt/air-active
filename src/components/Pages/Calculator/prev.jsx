import { Box, Grid, Paper, styled } from '@mui/material';
import React from 'react'
import TestForm from '../../Test';
import CalcItem from './CalcItem';


const awdawd = () => {
    return (
        // <Grid container rowSpacing={3} columnSpacing={4}
        <Grid container
            sx={{
                mx: 5,
                borderRadius: 5,
                bgcolor: 'white',
                boxShadow: 3
            }}
        >
            <Grid item xs={12} md={6}
                sx={{ display: 'flex' }}
            >
                <CalcItem>1</CalcItem>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{ display: 'flex' }}
            >
                <CalcItem>2</CalcItem>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{ display: 'flex' }}
            >
                <CalcItem>3</CalcItem>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{ display: 'flex' }}
            >
                <CalcItem>4</CalcItem>
            </Grid>
        </Grid>

    )

}

export default awdawd
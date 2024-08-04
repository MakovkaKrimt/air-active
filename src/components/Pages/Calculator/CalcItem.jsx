import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { FormControl, Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';


const fieldData = [
    {
        label: 'Напряжение',
        measure: ['V', 'kV', 'mV']
    },
    {
        label: 'Сила тока',
        measure: ['A', 'mA']
    },
    {
        label: 'Мощность',
        measure: ['W', 'kW', 'mW']
    }
]

const CalcItem = ({ onFormFilled }) => {

    const [fieldValues, setFieldValues] = useState(Array(fieldData.length).fill(''));

    const [fieldToDisable, setFieldToDisable] = useState(-1)

    const handleFieldChange = (fieldIndex, newValue) => {

        if (newValue.match(/[^0-9]/)) {
            return;
        }

        setFieldValues(prevData => {

            const newData = [...prevData]
            newData[fieldIndex] = newValue
            return newData
        })
    }

    React.useEffect(() => {

        if (fieldValues.filter(item => item).length >= 2) {

            onFormFilled(true)
            const zeroFieldIndex = fieldValues.indexOf('');
            if (zeroFieldIndex !== -1) {
                setFieldToDisable(zeroFieldIndex);
            }
        }
        else {
            // onFormFilled(false)
            setFieldToDisable(-1);
        }
    }, [fieldValues])


    return (
        <Box
            component='form'
            autoComplete="off"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 2
            }}
        >
            <Grid container rowSpacing={3} columnSpacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography>Укажите параметры сети (Необходимо заполнить два из трех обязательных полей)</Typography>
                </Grid>

                {fieldData.map((obj, index) => (
                    <Grid item xs={12} md={6}>
                        <NumberInput
                            key={obj.label}
                            label={obj.label}
                            value={fieldValues[index]}
                            onChangeFunc={(event) => handleFieldChange(index, event.target.value)}
                            isDisabled={index === fieldToDisable ? true : false}
                            measures={obj.measure}
                        />
                    </Grid>
                ))}
            </Grid>

        </Box >)

}

const NumberInput = ({ label, value, onChangeFunc, isDisabled, measures }) => {

    const [unit, setUnit] = useState('');

    const handleUnitChange = (event) => {
        // const newUnit = event.target.value;
        // console.log('awdawdawdaw')
        // // console.log(`Присвоенное значение ${newUnit}`)
        // setUnit(newUnit);
    };

    React.useEffect(() => {
        console.log(unit)

    }, [unit])



    return (
        <FormControl
            fullWidth
        >
            <Grid container columnSpacing={2}>
                <Grid item xs={9}>
                    <TextField
                        label={label}
                        value={value}
                        onChange={onChangeFunc}
                        size='medium'
                        fullWidth
                        disabled={isDisabled}
                        variant={isDisabled ? 'filled' : 'outlined'}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Select
                        fullWidth
                        size='medium'
                        value={unit}
                        onChange={handleUnitChange}
                        // displayEmpty
                        disabled={isDisabled}
                        inputProps={{ 'aria-label': 'Without label' }}

                    >
                        {measures.map((value, index) => {
                            return <MenuItem value={index}>{value}</MenuItem>
                        })}

                    </Select>
                </Grid>
            </Grid>
        </FormControl>
    )
}




export default CalcItem
import { Box, Button, TextField, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';

const TestForm = () => {
    const [firstField, setFirstField] = useState('');
    const [secondField, setSecondField] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!(firstField || secondField));
    }, [firstField, secondField]);

    const handleFirstFieldChange = (event) => {
        setFirstField(event.target.value);
    };

    const handleSecondFieldChange = (event) => {
        setSecondField(event.target.value);
    };

    const handleButtonClick = () => {
        // Действие при нажатии на кнопку
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                gap: 3
            }}
        >
            <TextField
                label='Первое поле'
                value={firstField}
                onChange={handleFirstFieldChange}
            />
            <TextField
                label='Второе поле'
                value={secondField}
                onChange={handleSecondFieldChange}
            />
            <FormHelperText error={!firstField && !secondField}>
                {(!firstField && !secondField) && 'Необходимо заполнить хотя бы одно поле'}
            </FormHelperText>
            <Button
                variant='contained'
                disabled={isButtonDisabled}
                onClick={handleButtonClick}
            >
                Нажми на меня
            </Button>
        </Box>
    );
};

export default TestForm;

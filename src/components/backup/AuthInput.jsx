import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Divider, Fade, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


export const AuthInput = ({ type, register, errors }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const commonProps = {
        ...register(type),
        id: type,
        name: type,
        error: !!errors[type],
        autoComplete: 'off'
    }

    const txtProps = {
        ...commonProps,
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        aria-label="toggle reset input"
                    // onClick={() => setValue('')}
                    >
                        <ClearOutlinedIcon />
                    </IconButton>
                </InputAdornment >
            ),
        },
    }

    const pwdProps = {
        ...commonProps,
        type: showPassword ? "text" : "password",
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            ),
        },
    }

    return (

        <Stack
            direction='column'
            gap={1}

        >
            <TextField
                {...(type.endsWith('password') ? pwdProps : txtProps)}
            >
            </TextField>
            {/* }>

            {/* Error helper alerts */}

            {!!errors[type] && (

                <Fade in={!!errors[type]}>
                    <Alert
                        variant='standard'
                        severity="error"
                        sx={{
                            fontSize: '12px',
                            wordWrap: 'break-word',
                        }}
                    >
                        {errors[type]?.message}
                    </Alert>
                </Fade>
            )}
        </Stack>

    )
}




import React, { useEffect, useState } from 'react'
import { Alert, Collapse, Divider, Fade, Grid, IconButton, InputAdornment, Slide, Stack, TextField, Typography, Zoom } from '@mui/material';
import { FORM_LABELS } from '../../services/auth/constants/authConstants';
import AuthTooltipHelper from './AuthTooltipHelper'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { BorderLeft, Visibility, VisibilityOff, WidthFull } from '@mui/icons-material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useFormContext } from 'react-hook-form';
import { LottieCheckedInput } from '../Lotties/LottieCheckedInput';


const { TEXTS, HELPERS } = FORM_LABELS


export const AuthFormInput = ({ type }) => {

    const { register, getFieldState, resetField, formState: { isValid, errors } } = useFormContext()
    const { invalid, isDirty, error } = getFieldState(type)
    const [showPassword, setShowPassword] = useState(false);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowPassword = () => setShowPassword(!showPassword);


    const handleReset = () => {
        resetField(type)
    }


    const commonProps = {
        ...register(type),
        id: type,
        name: type,
        error: !!errors[type],
        autoComplete: 'off',
        sx: {
            width: '100%'
        },
    }

    const txtProps = {
        ...commonProps,
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        aria-label="toggle reset input"
                        onClick={handleReset}
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
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        aria-label="toggle reset input"
                        onClick={handleReset}
                    >
                        <ClearOutlinedIcon />
                    </IconButton>
                </InputAdornment>
            ),
        },
    }

    return (
        <>
            {/* LABEL */}
            <Stack>
                <Grid
                    container
                    direction='row'
                    alignItems="center"
                    justifyContent='space-between'
                    gap={1}
                    sx={{
                        pr: '10px'
                    }}
                >
                    {/* Input label */}

                    {HELPERS[type] ? (
                        <AuthTooltipHelper
                            type={type}
                            open={invalid}
                            child={
                                <Grid item xs>
                                    <Typography
                                        variant='body1'
                                        color={invalid ? 'primary' : "GrayText"}
                                    >{TEXTS[type]}</Typography>
                                </Grid>
                            }>
                        </AuthTooltipHelper>) : (
                        <Grid item xs >
                            <Typography
                                variant='body1'
                                color={invalid ? 'primary' : "GrayText"}
                            >{TEXTS[type]}</Typography>

                        </Grid>
                    )}

                    <LottieCheckedInput
                        invalid={invalid}
                        isDirty={isDirty}
                    />

                </Grid>

                {/* INPUT */}

                <Stack
                    direction='column'
                    gap={0.5}
                >
                    <TextField
                        {...(type.endsWith('password') ? pwdProps : txtProps)}>

                    </TextField>

                    {/* Error helper alerts */}

                    {invalid && (
                        <Fade
                            in={true}
                            timeout={400}
                            mountOnEnter
                            unmountOnExit
                        >
                            <Alert
                                variant='standard'
                                severity="error"
                                sx={{
                                    borderRadius: 2,
                                    fontSize: '12px',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {error.message}
                            </Alert>
                        </Fade>
                    )}
                </Stack>
            </Stack>
        </>
    )
}




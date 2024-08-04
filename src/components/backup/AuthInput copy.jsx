import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Fade, FormHelperText, IconButton, InputAdornment, Paper, Popper, TextField, Tooltip, Typography, useFormControl } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AUTOCOMPLITE_INPUT_TYPES, FORM_LABELS } from '../../services/auth/constants/authConstants';

const { TEXTS, HELPERS } = FORM_LABELS

const AuthInput = ({ type, register, errors }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    // const [open, setOpen] = useState(false);

    const handleOnFocus = (e) => {
        setAnchorEl(e.currentTarget);
        // setOpen(true);
    };

    const handleOnBlur = (e) => {
        setAnchorEl(null);
        // setOpen(false);
    };

    const open = Boolean(anchorEl);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const txtProps = {
        ...register(type),
        id: type,
        name: type,
        required: true,
        fullWidth: true,
        color: 'grey',
        error: !!errors[type],
        helperText: !!errors[type] ? errors[type].message : "",
        autoComplete: AUTOCOMPLITE_INPUT_TYPES[type],
        onFocus: handleOnFocus,
        onBlur: handleOnBlur,
    }

    const pwdProps = {
        ...txtProps,
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
        <Box
            sx={{
                m: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Popper
                // sx={{
                //     zIndex: 1200,
                // }}
                open={open}
                anchorEl={anchorEl}
                placement='left'
                transition
            // modifiers={[
            //     {
            //         name: 'arrow',
            //         enabled: true,
            //         options: {
            //             element: arrowRef,
            //         },
            //     },
            // ]}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Alert
                            sx={{
                                maxWidth: '200px'
                            }}
                            variant='outlined'
                            severity="error"
                        >
                            {HELPERS[type]}
                        </Alert>
                        {/* <Box
                            sx={{
                                // boxShadow: 3,
                                bgcolor: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(5px)",
                                // boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            }}

                        >
                            <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                        </Box> */}
                    </Fade>
                )}
            </Popper>


            <Typography
                variant='subtitle1'
                color={!!errors[type] ? 'primary' : "ActiveCaption"}
            >{TEXTS[type]}</Typography>
            <Tooltip title="Delete">
                <TextField
                    {...(type.endsWith('password') ? pwdProps : txtProps)}
                />
            </Tooltip>
            {/* {HELPERS[type] && focused && (
                <Alert
                    variant='standard'
                    severity="error"
                >
                    {HELPERS[type]}
                </Alert>
            )} */}
        </Box >
    )
}

export default AuthInput



import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { FORM_LABELS } from '../../services/auth/constants/authConstants'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AuthTooltipHelper from './AuthTooltipHelper'


const { TEXTS, HELPERS } = FORM_LABELS

export const AuthInputLabel = ({ type, errors }) => {

    return (
        <Grid
            container
            direction='row'
            alignItems="stretch"
            justifyContent='space-between'
            gap={1}
        >

            {/* Helper info */}

            {/* <Grid
                item
                display='flex'
            >
                {HELPERS[type] ? (
                    <AuthTooltipHelper
                        child={
                            <HelpOutlineOutlinedIcon
                                fontSize='small'
                                sx={{
                                    color: !!errors[type] ?
                                        (theme) => theme.palette.primary.main
                                        : 'info',
                                    borderWidth: 1
                                }}
                            />
                        }
                        type={type}
                    >
                    </AuthTooltipHelper >
                ) : (
                    // null
                    < Box
                        sx={{
                            minHeight: '24px',
                            minWidth: '24px'
                        }} />
                )}
            </Grid> */}

            {/* Header  */}

            {HELPERS[type] ? (
                <AuthTooltipHelper
                    open
                    child={
                        <Grid
                            item
                            xs
                        >
                            <Typography
                                variant='body1'
                                color={!!errors[type] ? 'primary' : "ActiveCaption"}
                            >{TEXTS[type]}</Typography>
                        </Grid>
                    }>
                </AuthTooltipHelper>) : (
                <Grid
                    item
                    xs
                >
                    <Typography
                        variant='body1'
                        color={!!errors[type] ? 'primary' : "ActiveCaption"}
                    >{TEXTS[type]}</Typography>
                </Grid>
            )}

        </Grid>
    )
}

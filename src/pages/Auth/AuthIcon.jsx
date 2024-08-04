import { Box, Stack } from '@mui/material'
import React from 'react'

export const AuthIcon = () => {
    return (
        <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
        // sx={{ width: '100%', height: '100%' }
        // }
        >
            <img
                src="./media/logo_icon-cropped.svg"
                alt="Plus Icon"
                width='60px'
                heignt='60px'

            />
        </Stack>
    )
}

import { Divider, Fade, Slide, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAuthStateContext } from '../../providers/AuthProvider'
import { TransitionGroup } from 'react-transition-group'
import { useAuthFormTransStateContext } from '../../providers/AuthFormTransProvider'


export const AuthFormTitle = ({ formTitle }) => {

    const authState = useAuthStateContext()
    const transState = useAuthFormTransStateContext()
    const titleContainerRef = React.useRef(null)

    const transProps = {
        container: titleContainerRef.current,
        timeout: 400,
        mountOnEnter: true,
        // unmountOnExit: true
    }

    const handleTransEnd = () => {

        if (!authState.isAuth) {
            transState.setIsTitleBlockUnmounted(false)
            return transState.setIsTitleBlockMounted(true)
        }
        transState.setIsTitleBlockUnmounted(true)
        transState.setIsTitleBlockMounted(false)

    }

    return (
        < Stack
            direction="column"
            alignItems='center'
            rowGap={1}
        >
            <Stack
                ref={titleContainerRef}
                direction="column"
                rowGap={1}
                sx={{
                    overflow: 'hidden'
                }}
            >
                <Fade
                    {...transProps}
                    in={!authState.isRegistered}
                >
                    <Typography
                        textAlign='center'
                        variant="h5"
                    >
                        {formTitle}
                    </Typography>
                </Fade>
                <Slide
                    {...transProps}
                    in={!authState.isRegistered}
                    direction="left"
                    onTransitionEnd={handleTransEnd}
                >
                    <Divider sx={{
                        borderColor: (theme) => theme.palette.primary.main,
                        borderWidth: 2
                    }} />
                </Slide>
            </Stack>
        </Stack >
    )
}


















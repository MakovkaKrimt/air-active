import { Button, Divider, Fade, Slide, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuthStateContext } from '../../providers/AuthProvider'
import { TransitionGroup } from 'react-transition-group'
import { useAuthFormTransitStateContext } from '../../providers/AuthFormTransitProvider'


export const AuthFormButton = ({ formBtnLabel }) => {

    const authState = useAuthStateContext()
    const authTransitState = useAuthFormTransitStateContext()
    const [buttonTransit, setButtonTransit] = useState(false)
    const containerRef = React.useRef(null)

    const transitTimeout = !authState.isAuth
        ? authTransitState.buttonBlockTimeout.enter
        : authTransitState.buttonBlockTimeout.exit

    const transitDirection = !authState.isAuth
        ? "left"
        : 'right'


    useEffect(() => {

        if (authTransitState.isLinkBlockExited && authState.isAuth) {
            return setButtonTransit(false)
        }
        if (authTransitState.isInputBlockEntered) {
            return setButtonTransit(true)
        }

    }, [authTransitState.isLinkBlockExited, authTransitState.isInputBlockEntered, authState.isAuth])


    const handleBlockEntered = () => {

        authTransitState.setIsButtonBlockEntered(true)
        authTransitState.setIsButtonBlockExited(false)
    }

    const handleBlockExited = () => {
        authTransitState.setIsButtonBlockEntered(false)
        authTransitState.setIsButtonBlockExited(true)
    }


    return (
        <Stack
            ref={containerRef}
            direction="column"
            rowGap={1}
            sx={{
                overflow: 'hidden'
            }}
        >
            <Slide
                in={buttonTransit}
                container={containerRef.current}
                direction={transitDirection}
                timeout={transitTimeout}
                onEntered={handleBlockEntered}
                onExited={handleBlockExited}
            >

                <Button
                    disableRipple
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 2,
                        borderRadius: 2,
                        width: '100%',
                    }}
                >
                    {formBtnLabel}
                </Button>
            </Slide>
        </Stack >
    )
}


















import { Button, Divider, Fade, Slide, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuthStateContext } from '../../providers/AuthProvider'
import { useAuthFormTransitStateContext } from '../../providers/AuthFormTransitProvider'


export const AuthFormLinkFooter = ({ footer }) => {

    const authState = useAuthStateContext()
    const authTransitState = useAuthFormTransitStateContext()
    const [linkTransit, setLinkTransit] = useState(false)
    const containerRef = React.useRef(null)

    const transitTimeout = !authState.isAuth
        ? authTransitState.linkBlockTimeout.enter
        : authTransitState.linkBlockTimeout.exit


    useEffect(() => {

        if (authState.isAuth) {
            return setLinkTransit(false)
        }
        if (authTransitState.isButtonBlockEntered) {
            return setLinkTransit(true)
        }

    }, [authState.isAuth, authTransitState.isButtonBlockEntered])


    const handleBlockEntered = () => {

        authTransitState.setIsLinkBlockEntered(true)
        authTransitState.setIsLinkBlockExited(false)
    }

    const handleBlockExited = () => {
        authTransitState.setIsLinkBlockEntered(false)
        authTransitState.setIsLinkBlockExited(true)
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
                in={linkTransit}
                container={containerRef.current}
                direction="down"
                timeout={transitTimeout}
                onEntered={handleBlockEntered}
                onExited={handleBlockExited}
            >
                {/* <Fade
                    in={linkTransit}
                    timeout={transTimeout}
                    onEntered={handleBlockEntered}
                    onExited={handleBlockExited}
                > */}
                <Stack>{footer}</Stack>
                {/* </Fade> */}
            </Slide>
        </Stack >
    )
}


















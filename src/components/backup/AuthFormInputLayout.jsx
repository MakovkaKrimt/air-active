import { Button, Divider, Fade, Slide, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { REGISTER_INPUTS } from '../../services/auth/constants/authConstants'
import { AuthInput } from './AuthInput'
import { useAuthFormTransStateContext } from '../../providers/AuthFormTransProvider'
import { useAuthStateContext } from '../../providers/AuthProvider'


const transTimeout = 600
const transProps = {
    timeout: transTimeout,
    mountOnEnter: true,
    // unmountOnExit: true,
}

export const AuthFormInputLayout = () => {

    const authState = useAuthStateContext()
    const transState = useAuthFormTransStateContext()
    const inputsContainerRef = React.useRef(null)
    const containerRef = React.useRef(null)

    const [dividerMount, setDividerMount] = useState(false)
    const [inputMount, setInputMount] = useState(false)

    useEffect(() => {
        if (transState.isTitleBlockMounted || transState.isTitleBlockUnmounted) {
            setDividerMount(true)
        }
    },
        [transState.isTitleBlockMounted, transState.isTitleBlockUnmounted]
    )

    const handleDividerTransEnd = () => {
        if (transState.isTitleBlockMounted) {
            setInputMount(true)
        }
        else if (transState.isTitleBlockUnmounted) {
            setInputMount(false)
        }
        setTimeout(() => {
            setDividerMount(false)
        }, transTimeout)
    }

    return (
        <>
            <Stack
                direction='row'
                gap={1.5}
                ref={inputsContainerRef}
                sx={{
                    overflow: 'hidden',
                    height: '400px'
                }}

            >
                <Slide
                    in={dividerMount}
                    container={inputsContainerRef.current}
                    direction="down"
                    onTransitionEnd={handleDividerTransEnd}
                >
                    <Divider
                        sx={{
                            borderColor: (theme) => theme.palette.primary.main,
                            borderWidth: 1.5,
                            boxShadow: '0 2px 10px rgba(255, 255, 255, 1)',
                        }}
                    />

                </Slide>
                <Stack
                    direction='column'
                    justifyContent="center"
                    alignItems="stretch"
                    sx={{
                        width: '100%'
                    }}

                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        gap={0.5}
                        ref={containerRef}
                        sx={{
                            overflow: 'hidden'
                        }}
                    >
                        <Slide
                            in={inputMount}
                            {...transProps}
                            container={containerRef.current}
                            direction="right"
                        >
                            <Stack>
                                {
                                    REGISTER_INPUTS.map((item, index) => {
                                        return (
                                            <AuthInput
                                                key={`${item}_${index}`}
                                                type={item}
                                            />
                                        )
                                    })
                                }
                            </Stack>
                        </Slide >
                    </Stack >
                </Stack >


            </Stack >
            <Fade
                in={inputMount}
                timeout={transTimeout}
            >
                <Button
                    variant='contained'
                    onClick={
                        authState.registration
                    }
                >Зайти</Button>
            </Fade>
            {/* <Button
                variant='contained'
                onClick={
                    authState.unregistation
                }
            >Выйти</Button> */}
        </>
    )
}
















import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react';
import animationData from '../../assets/new_upload.json'
import { useLocation } from 'react-router-dom';
import { useAuthStateContext } from '../../providers/AuthProvider';
import { useAuthFormTransitStateContext } from '../../providers/AuthFormTransitProvider';


export const LottieAuthLogo = () => {

    const authState = useAuthStateContext()
    const authTransitState = useAuthFormTransitStateContext()
    const [isShowed, setIsShowed] = useState(false)
    const currentLocation = useLocation();
    const animRef = useRef(null)


    useEffect(() => {

        animRef.current.setSpeed(2)

        if (authState.isAuth && isShowed) {
            setIsShowed(false)
            animRef.current.setDirection(-1)
        }

        if (!authState.isAuth) {
            animRef.current.stop()
            setIsShowed(true)
            animRef.current.setDirection(1)
        }

        return animRef.current.play()

    }, [authState.isAuth])


    useEffect(() => {

        // console.log(currentLocation.pathname)
        animRef.current.stop()
        animRef.current.setSpeed(1)
        animRef.current.setDirection(1)
        animRef.current.play()
        setIsShowed(true)

    }, [currentLocation])

    const style = {
        width: '150px',
        height: '150px'
    }

    const handleLoopComplete = () => {
        if (isShowed) {
            return authTransitState.setIsMainLogoExited(true)
        }
        authTransitState.setIsMainLogoEntered()
    }

    return (
        <>
            <Lottie
                autoplay={false}
                loop={false}
                animationData={animationData}
                style={style}
                lottieRef={animRef}
                onComplete={handleLoopComplete}
            />
        </>
    )
}


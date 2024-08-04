import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react';
import animationData from '../../assets/portal.json'
import { useLocation } from 'react-router-dom';


export const LottiePortal = () => {

    const currentLocation = useLocation();
    const animRef = useRef(null)

    useEffect(() => {

        animRef.current.stop()
        animRef.current.setSpeed(1)
        animRef.current.setDirection(1)
        animRef.current.play()
    }, [currentLocation])


    const style = {
        width: '10px',
        height: '340px'
    }

    return (
        <>
            <Lottie
                autoplay={false}
                loop={true}
                animationData={animationData}
                style={style}
                lottieRef={animRef}
            />
        </>
    )
}


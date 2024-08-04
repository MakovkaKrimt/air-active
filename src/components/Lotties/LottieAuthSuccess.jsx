import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react';
import animationData from '../../assets/SuccessAuthFilled.json'


export const LottieAuthSuccess = () => {

    const animRef = useRef(null)

    // useEffect(() => {

    //     animRef.current.stop()
    //     animRef.current.setSpeed(1)
    //     animRef.current.setDirection(1)
    //     animRef.current.play()
    // }, [])


    const style = {
        width: '300px',
        height: '300px'
    }

    return (
        <>
            <Lottie
                autoplay={true}
                loop={false}
                animationData={animationData}
                style={style}
                lottieRef={animRef}
            />
        </>
    )
}


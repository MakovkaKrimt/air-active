import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react';
import animationData from '../../assets/new_upload.json'



export const LottieHomeLogo = () => {


    const animRef = useRef(null)

    const style = {
        width: '150px',
        height: '150px'
    }


    return (
        <>
            <Lottie
                autoplay={true}
                loop={true}
                animationData={animationData}
                style={style}
                lottieRef={animRef}
            />
        </>
    )
}


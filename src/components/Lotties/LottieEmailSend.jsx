import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react';
import animationData from '../../assets/EmailSend.json'


export const LottieEmailSend = () => {

    const style = {
        // width: '100px',
        // height: '100px'
        width: '80%',
        height: '80%'
    }

    return (
        <>
            <Lottie
                autoplay={true}
                loop={false}
                animationData={animationData}
                style={style}
            />
        </>
    )
}


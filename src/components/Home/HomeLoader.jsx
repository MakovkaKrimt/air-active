import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { LottieHomeLogo } from '../Lotties/LottieHomeLogo';
import { Fade } from '@mui/material';

export const HomeLoader = ({ openLoader }) => {



    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openLoader}
            TransitionComponent={Fade}
            transitionDuration={1000}
        >
            <LottieHomeLogo />
        </Backdrop>
    );
}

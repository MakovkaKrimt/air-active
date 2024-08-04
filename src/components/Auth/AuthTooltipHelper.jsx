import { Alert, AlertTitle, Fade, styled, Tooltip, tooltipClasses } from '@mui/material';
import React from 'react'
import { FORM_LABELS } from '../../services/auth/constants/authConstants';
import { BorderRight } from '@mui/icons-material';


const { HELPERS } = FORM_LABELS


const AuthTooltipHelper = ({ child, type, focused, open }) => {


    const CustomToolTip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            m: 0,
            p: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            // backdropFilter: "blur(5px)",
            // // borderRadius: 2,
            // // borderWidth: 1.5,
            // // borderColor: 'green',
            // color: 'rgba(0, 0, 0, 0.87)',
            // fontSize: 11,
        },
    }));


    return (
        <CustomToolTip
            open={open}
            arrow
            title={
                <Alert
                    variant='standard'
                    severity="error"
                    sx={{
                        fontSize: 11,
                        bgcolor: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(5px)",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                        borderRight: '1px solid red'
                    }}
                >
                    <AlertTitle
                        variant='caption'
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >Подсказка</AlertTitle>
                    {HELPERS[type]}
                </Alert>
            }
            placement="left" >
            {child}
        </CustomToolTip>
    )



}

export default AuthTooltipHelper
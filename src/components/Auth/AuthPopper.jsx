import { Popper } from '@mui/material'
import React from 'react'

const AuthPopper = () => {
    return (

        <Popper
            placement="left"
            disablePortal={false}
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: arrowRef,
                    },
                },
            ]}
        >
            Popper
        </Popper >

    )
}

export default AuthPopper
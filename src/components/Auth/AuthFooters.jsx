import { Stack, Typography, Link as MuiLink, Fade } from "@mui/material"
import { Link } from "react-router-dom"
import { FORM_LABELS } from "../../services/auth/constants/authConstants"
import AuthStateContextProvider, { useAuthStateContext } from "../../providers/AuthProvider"
import { AuthFormTransitStateContextProvider, useAuthFormTransitStateContext } from "../../providers/AuthFormTransitProvider"

const { HAS_ACCOUNT, LOGIN } = FORM_LABELS.LINKS.REGISTER

export const RegisterFooter = () => {

    return (
        < Stack
            direction='column'
            justifyContent="center"
            alignItems="stretch"
            rowGap={2}
        >
            <Stack
                flexDirection='row'
                justifyContent='center'
                columnGap={2}
            >
                <Typography variant="body2">{HAS_ACCOUNT}</Typography>
                <Link to="/auth/login" style={{ fontSize: '14px' }} >{LOGIN}</Link>
            </Stack>

        </Stack >
    )
}
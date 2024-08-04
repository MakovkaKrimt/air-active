import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export const AuthCopyright = (props) => {
    return (
        <Stack

            direction='column'
            justifyContent='center'
            sx={{
                height: '100%',
                width: '100%'
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                {...props}
            >
                {"Copyright © "}
                < Link color="inherit" href="https://airmagistral.ru/" >
                    Air Magistral
                </Link > {" "}
                {new Date().getFullYear()}
                {"."}
            </Typography >
        </Stack>
    );
}
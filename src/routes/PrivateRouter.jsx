import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStateContext } from "../providers/AuthProvider";
import { Box, LinearProgress } from "@mui/material";

const PrivateRouter = () => {
    const user = useAuthStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('access-token')) {
                    await user.checkAuth();
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    if (!user.isAuth) {
        return <Navigate to="/auth/login" />;
    }

    return <Outlet />;
};

export default PrivateRouter;

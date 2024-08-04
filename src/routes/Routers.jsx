import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import AuthStateContextProvider from "../providers/AuthProvider";
import PrivateRouter from "./PrivateRouter";
import { ResetPassword } from "../pages/Auth/ResetPassword";
import { ForgotPassword } from "../pages/Auth/ForgotPassword";
import { Registration } from "../pages/Auth/Registration";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Auth/Login";
import { AuthLayout } from "../pages/Auth/AuthLayout";
import { AuthFormTransitStateContextProvider } from "../providers/AuthFormTransitProvider";
import { AuthSuccessed } from "../components/Auth/AuthSuccessed";


export const Routers = () => {
    return (
        <Router>
            <AuthStateContextProvider>
                <AuthFormTransitStateContextProvider>
                    <Routes>
                        {/* <Route element={<PrivateRouter />}> */}
                        <Route path="/" element={<Home />} />
                        {/* </Route> */}
                        <Route path='/auth' element={<AuthLayout />}>
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Registration />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                            <Route path="reset-password" element={<ResetPassword />} />
                            <Route path="successed" element={<AuthSuccessed />} />
                        </Route>
                    </Routes>
                </AuthFormTransitStateContextProvider>
            </AuthStateContextProvider>
        </Router>
    );
};

// export const Routers = () => {
//     return (
//         <Router>
//             <AuthProvider>
//                 <Routes>
//                     <Route element={<PrivateRouter />}>
//                         <Route path="/" element={<Home />} />
//                     </Route>
//                     <Route path="/register" element={<SignLayout child={<Registration />} />} />
//                     <Route path="/login" element={<SignLayout child={<Login />} />} />
//                     <Route path="/forgot-password" element={<SignLayout child={<ForgotPassword />} />} />
//                     <Route path="/reset-password" element={<SignLayout child={<ResetPassword />} />} />
//                 </Routes>
//             </AuthProvider>
//         </Router>
//     );
// };
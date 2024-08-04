
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthMutations from "../services/auth/authUseMutations";
import { BASE_URL } from "../services/api";
import axios from "axios";

const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

const AuthStateContext = createContext();

const AuthStateContextProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const navigate = useNavigate();
    // const [token, setToken] = useState(localStorage.getItem("access-token") || "");

    const setAuth = (data) => {
        console.log(data)
        // setIsAuth(true);
        // setUser(data.user);
        // localStorage.setItem("access-token", data.accessToken);
    }

    const registration = () => {
        // setAuth(data)
        setIsAuth(true)
        setIsRegistered(true)
        // setAuth(data)
        // navigate("/");
    }

    const unRegistration = () => {
        setIsAuth(false)
        setIsRegistered(false)
    }

    const clearState = () => {
        setIsAuth(false)
        setIsRegistered(false)
    }

    const login = (data) => {
        setAuth(data)
        navigate("/");
    }

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem("access-token");
        navigate("/login");
    }

    const checkAuth = async () => {
        try {
            const response = await api.post(`${BASE_URL}/api/users/refresh`)
            console.log(response)
            setAuth(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    // const registration = (data) => {
    //     const mutation = AuthMutations.useRegisterUser()

    //     if (mutation.isError) {
    //         console.log(mutation.error.message)
    //     }

    //     if (mutation.isSuccess) {
    //         setUser({ ...mutation.data.data.user })
    //         console.log('Результат мутации')
    //         console.log(user)

    //     }
    //     mutation.mutate(data)
    // };


    return (
        <AuthStateContext.Provider value={{ user, isAuth, setIsAuth, unRegistration, registration, login, logout, checkAuth, isRegistered, clearState }}>
            {children}
        </AuthStateContext.Provider>
    );

};

export default AuthStateContextProvider;

export const useAuthStateContext = () => {
    return useContext(AuthStateContext);
};

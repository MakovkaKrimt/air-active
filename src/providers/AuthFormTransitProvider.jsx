
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthFormTransitStateContext = createContext();

export const AuthFormTransitStateContextProvider = ({ children }) => {


    const transTimeoutIn = 350
    const transTimeoutOut = 250

    const titleBlockTimeout = { enter: transTimeoutIn, exit: transTimeoutOut }
    const inputBlockTimeout = { enter: transTimeoutIn, exit: transTimeoutOut }
    const buttonBlockTimeout = { enter: transTimeoutIn, exit: transTimeoutOut }
    const linkBlockTimeout = { enter: transTimeoutIn, exit: transTimeoutOut }

    const [isTitleBlockEntered, setIsTitleBlockEntered] = useState(false);
    const [isTitleBlockExited, setIsTitleBlockExited] = useState(false);
    const [isInputBlockEntered, setIsInputBlockEntered] = useState(false);
    const [isInputBlockExited, setIsInputBlockExited] = useState(false);
    const [isButtonBlockEntered, setIsButtonBlockEntered] = useState(false);
    const [isButtonBlockExited, setIsButtonBlockExited] = useState(false);
    const [isLinkBlockEntered, setIsLinkBlockEntered] = useState(false);
    const [isLinkBlockExited, setIsLinkBlockExited] = useState(false);
    const [isMainLogoEntered, setIsMainLogoEntered] = useState(false);
    const [isMainLogoExited, setIsMainLogoExited] = useState(false);
    const [isFormExited, setIsFormExited] = useState(false);


    const clearState = () => {
        setIsTitleBlockEntered(false)
        setIsTitleBlockExited(false)
        setIsInputBlockEntered(false)
        setIsInputBlockExited(false)
        setIsButtonBlockEntered(false)
        setIsButtonBlockExited(false)
        setIsLinkBlockEntered(false)
        setIsLinkBlockExited(false)
        setIsMainLogoEntered(false)
        setIsMainLogoExited(false)
        setIsFormExited(false)
    }

    useEffect(() => {
        if (isFormExited) {
            clearState()
        }

    }, [isFormExited])


    const setFormIsExited = () => {
        setIsFormExited(true)
    }

    const setFormIsEntered = () => {
        setIsFormExited(false)
    }

    return (
        <AuthFormTransitStateContext.Provider value={{
            clearState,
            setFormIsExited,
            setFormIsEntered,
            titleBlockTimeout,
            inputBlockTimeout,
            buttonBlockTimeout,
            linkBlockTimeout,
            isFormExited,
            isTitleBlockEntered,
            isTitleBlockExited,
            isInputBlockEntered,
            isInputBlockExited,
            isButtonBlockEntered,
            isButtonBlockExited,
            isLinkBlockEntered,
            isLinkBlockExited,
            isMainLogoEntered,
            isMainLogoExited,
            setIsTitleBlockEntered,
            setIsTitleBlockExited,
            setIsInputBlockEntered,
            setIsInputBlockExited,
            setIsButtonBlockEntered,
            setIsButtonBlockExited,
            setIsLinkBlockEntered,
            setIsLinkBlockExited,
            setIsMainLogoEntered,
            setIsMainLogoExited
        }}>
            {children}
        </AuthFormTransitStateContext.Provider>
    );

};

export const useAuthFormTransitStateContext = () => {
    return useContext(AuthFormTransitStateContext);
};

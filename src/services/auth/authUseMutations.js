import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosQueries from "./authAxiosQueries";
import { useAuthStateContext } from "../../providers/AuthProvider";

export default class AuthMutations {

    auth = useAuthStateContext();

    static useRegisterUser() {
        return useMutation({
            mutationKey: ["register"],
            mutationFn: (data) => AuthAxiosQueries.registration(data),

        });
    }

    static useLoginUser() {
        return useMutation({
            mutationKey: ["login"],
            mutationFn: (data) => AuthAxiosQueries.login(data)
        });
    }

    static useLogoutUser() {
        return useMutation({
            mutationKey: ["logout"],
            mutationFn: (data) => AuthAxiosQueries.logout(data)
        });
    }

    static useRequestResPwd() {
        return useMutation({
            mutationKey: ["req-res-pwd"],
            mutationFn: (token, email, data) => AuthAxiosQueries.requestResetPwd(token, email, data)
        });
    }

    static useResetPwd() {
        return useMutation({
            mutationKey: ["reset-pwd"],
            mutationFn: (data) => AuthAxiosQueries.resetPwd(data)
        });
    }

}


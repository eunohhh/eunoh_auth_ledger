import api from "@/api/api";
import { AuthData } from "@/types/d";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

interface ChangeProfileParams {
    accessToken: string | null;
    data: AuthData;
}

function useAuth() {
    const { user, isLoggedIn, logOut } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
            isLoggedIn: state.isLoggedIn,
            logOut: state.logOut,
        }))
    );

    const { mutateAsync: signUp } = useMutation({
        mutationFn: (data: AuthData) => api.auth.signUp(data),
    });

    const { mutateAsync: logIn } = useMutation({
        mutationFn: (data: AuthData) => api.auth.logIn(data),
    });

    const { mutateAsync: getUser } = useMutation({
        mutationFn: (accessToken: string | null) =>
            api.auth.getUser(accessToken),
    });
    const { mutateAsync: changeProfile } = useMutation({
        mutationFn: ({ accessToken, data }: ChangeProfileParams) =>
            api.auth.changeProfile(accessToken, data),
    });

    return { user, isLoggedIn, signUp, logIn, getUser, changeProfile, logOut };
}

export default useAuth;

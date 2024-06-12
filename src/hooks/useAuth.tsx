import api from "@/api/api";
import { AuthData } from "@/types/d";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface ChangeProfileParams {
    accessToken: string | null;
    data: AuthData;
}

function useAuth() {
    const queryClient = useQueryClient();
    const accessToken: string | null = localStorage.getItem("accessToken");

    const { user, isLoggedIn, logOut, setUser, setLoggedIn } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
            isLoggedIn: state.isLoggedIn,
            logOut: state.logOut,
            setUser: state.setUser,
            setLoggedIn: state.setLoggedIn,
        }))
    );

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ["user", accessToken ?? ""],
        queryFn: () => api.auth.getUser(accessToken),
        staleTime: Infinity,
        retry: 0,
    });

    useEffect(() => {
        if (userData) {
            if (userData && userData.id && userData.nickname) {
                setUser({
                    userId: userData.id,
                    avatar: userData.avatar ? userData.avatar : null,
                    nickname: userData.nickname,
                });
                setLoggedIn(true);
            }
        }
    }, [userData, setUser, setLoggedIn]);

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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    return {
        user,
        isLoggedIn,
        signUp,
        logIn,
        getUser,
        changeProfile,
        logOut,
        userLoading,
    };
}

export default useAuth;

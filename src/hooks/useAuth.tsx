import api from "@/api/api";
import { AuthData } from "@/types/d";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";

function useAuth() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const { mutateAsync: signUp } = useMutation({
        mutationFn: (data: AuthData) => api.auth.signUp(data),
    });

    const { mutateAsync: logIn } = useMutation({
        mutationFn: (data: AuthData) => api.auth.logIn(data),
    });

    return { isLoggedIn, signUp, logIn };
}

export default useAuth;

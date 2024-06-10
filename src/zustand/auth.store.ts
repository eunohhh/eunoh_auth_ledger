import { AuthState } from "@/types/d";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user }),
    setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    logOut: () => {
        localStorage.removeItem("accessToken");
        set({ user: null, isLoggedIn: false });
    },
}));

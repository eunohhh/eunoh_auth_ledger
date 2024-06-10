import { AuthData } from "@/types/d";
import { useAuthStore } from "@/zustand/auth.store";
import { Axios, AxiosError } from "axios";

class AuthAPI {
    private axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async signUp(data: AuthData) {
        try {
            const path = "/register";

            const response = await this.axios.post(path, data);
            const result = response.data;

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }
    async logIn(data: AuthData) {
        const path = "/login";

        try {
            const response = await this.axios.post(path, data);
            const result = response.data;

            if (result.success) {
                localStorage.setItem("accessToken", result.accessToken);
                useAuthStore.getState().setUser({
                    userId: result.userId,
                    avatar: result.avatar,
                    nickname: result.nickname,
                });
                useAuthStore.getState().setLoggedIn(true);
            }

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }
    async getUser() {}
}

export default AuthAPI;

// async logOut() {
//     const path = "/auth/log-out";

//     const response = await this.#axios.delete(path);
//     const result = response.data.result;

//     return result;
// }
// async refreshToken() {
//     const path = "/auth/refresh-token";

//     const response = await this.#axios.get(path);
//     const result = response.data.result;

//     return result;
// }

import { AuthData, AxiosReturn } from "@/types/d";
import { Axios, AxiosError, AxiosResponse } from "axios";
import { API } from "./api";

class AuthAPI {
    private axios: Axios;
    private api: API;
    private token: string | null;

    constructor(axios: Axios, api: API, token: string | null) {
        this.axios = axios;
        this.api = api;
        this.token = token;
    }

    async signUp(data: AuthData): Promise<AxiosReturn> {
        try {
            const path = "/register";

            const response = await this.axios.post<AxiosReturn>(path, data);
            const result = response.data;

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }
    async logIn(data: AuthData): Promise<AxiosReturn> {
        const path = "/login";

        try {
            const response: AxiosResponse<AxiosReturn> =
                await this.axios.post<AxiosReturn>(path, data);
            const result = response.data;

            if (result.success && result.accessToken) {
                localStorage.setItem("accessToken", result.accessToken);
                if (result.success) {
                    localStorage.setItem("accessToken", result.accessToken);
                    await this.api.initializeUser(result.accessToken);
                }
            }

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }
    async getUser(accessToken: string | null = null): Promise<AxiosReturn> {
        const path = "/user";
        this.axios.defaults.headers.common.Authorization = accessToken
            ? `Bearer ${accessToken}`
            : this.token
            ? `Bearer ${this.token}`
            : "";

        try {
            const response: AxiosResponse<AxiosReturn> =
                await this.axios.get<AxiosReturn>(path);
            const result = response.data;

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }
    async changeProfile(
        accessToken: string | null = null,
        data: AuthData
    ): Promise<AxiosReturn> {
        const path = "/profile";

        this.axios.defaults.headers.common["Content-Type"] =
            "multipart/form-data";
        this.axios.defaults.headers.common.Authorization = accessToken
            ? `Bearer ${accessToken}`
            : this.token
            ? `Bearer ${this.token}`
            : "";

        try {
            const response: AxiosResponse<AxiosReturn> =
                await this.axios.patch<AxiosReturn>(path, data);
            const result = response.data;

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }
}

export default AuthAPI;

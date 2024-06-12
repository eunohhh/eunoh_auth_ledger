import { AuthData, AxiosReturn, CustomErrorResponse } from "@/types/d";
import { useAuthStore } from "@/zustand/auth.store";
import { Axios, AxiosError, AxiosResponse } from "axios";
class AuthAPI {
    private axios: Axios;
    private token: string | null;

    constructor(axios: Axios) {
        const accessToken: string | null = localStorage.getItem("accessToken");

        this.axios = axios;
        this.token = accessToken;
    }
    public async initializeUser(accessToken: string | null = this.token) {
        try {
            const user = await this.getUser(accessToken);
            if (user && user.id && user.nickname) {
                useAuthStore.getState().setUser({
                    userId: user.id,
                    avatar: user.avatar ? user.avatar : null,
                    nickname: user.nickname,
                });
                useAuthStore.getState().setLoggedIn(true);
            } else {
                console.log("첫 접속, 토큰 만료, 다시 로그인 하세요");
            }
        } catch (error) {
            console.log("유저 데이터 가져오기 실패 => ", error);
        }
    }

    public async signUp(data: AuthData): Promise<AxiosReturn> {
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
    public async logIn(data: AuthData): Promise<AxiosReturn> {
        const path = "/login?expiresIn=30m";

        try {
            const response: AxiosResponse<AxiosReturn> =
                await this.axios.post<AxiosReturn>(path, data);
            const result = response.data;

            if (result.success && result.accessToken) {
                localStorage.setItem("accessToken", result.accessToken);
                if (result.success) {
                    localStorage.setItem("accessToken", result.accessToken);
                    await this.initializeUser(result.accessToken);
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
    public async getUser(accessToken: string | null): Promise<AxiosReturn> {
        if (accessToken === null) throw new Error("엑세스 토큰 없음");

        const path = "/user";
        // accessToken 한번더 처리 => accessToken 있으면 사용 없으면 this.token 있는지 체크해서 사용 혹은 ""
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
                const axiosError = error as AxiosError<CustomErrorResponse>;
                if (
                    error.response?.data.message ===
                    "토큰이 만료되었습니다. 다시 로그인 해주세요."
                ) {
                    console.log(axiosError.response?.data.message);
                } else {
                    throw new Error(
                        axiosError.response?.data.message || error.message
                    );
                }
            }
            throw new Error("알수 없는 오류 발생!");
        }
    }
    public async changeProfile(
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

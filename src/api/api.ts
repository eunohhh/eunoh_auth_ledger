import { useAuthStore } from "@/zustand/auth.store";
import axios from "axios";
import AuthAPI from "./api.auth";

const BASE_URL = " https://moneyfulpublicpolicy.co.kr";

class API {
    private axios;
    public auth;

    constructor() {
        this.axios = axios.create({
            baseURL: BASE_URL,
        });

        this.auth = new AuthAPI(this.axios);

        // AuthAPI 인스턴스를 생성하고 나서 해야함
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            this.initializeUser(accessToken);
        }
    }

    private async initializeUser(accessToken: string) {
        try {
            const user = await this.auth.getUser(accessToken);
            useAuthStore.getState().setUser({
                userId: user.id,
                avatar: user.avatar,
                nickname: user.nickname,
            });
            useAuthStore.getState().setLoggedIn(true);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    }
}

const api = new API();

export default api;

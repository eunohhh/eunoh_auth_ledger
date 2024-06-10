import { useAuthStore } from "@/zustand/auth.store";
import axios from "axios";
import AuthAPI from "./api.auth";

const BASE_URL = " https://moneyfulpublicpolicy.co.kr";

export class API {
    private axios;
    public auth;
    private token: string | null;

    constructor() {
        const accessToken: string | null = localStorage.getItem("accessToken");
        this.token = accessToken;
        this.axios = axios.create({
            baseURL: BASE_URL,
        });

        this.auth = new AuthAPI(this.axios, this, this.token);

        // AuthAPI 인스턴스를 생성하고 나서 해야함
        if (accessToken) {
            this.initializeUser(accessToken);
        }
    }

    public async initializeUser(accessToken: string) {
        try {
            const user = await this.auth.getUser(accessToken);
            if (user.id && user.avatar && user.nickname) {
                useAuthStore.getState().setUser({
                    userId: user.id,
                    avatar: user.avatar,
                    nickname: user.nickname,
                });
                useAuthStore.getState().setLoggedIn(true);
            }
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    }
}

const api = new API();

export default api;

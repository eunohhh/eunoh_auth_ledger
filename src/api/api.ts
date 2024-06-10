import { useAuthStore } from "@/zustand/auth.store";
import axios from "axios";
import AuthAPI from "./api.auth";
import LedgerAPI from "./api.ledger";

const AUTH_BASE_URL = "https://moneyfulpublicpolicy.co.kr";
const LEDGER_BASE_URL = "https://bedecked-candy-relish.glitch.me";

export class API {
    private authAxios;
    private ledgerAxios;
    public auth;
    public ledger;

    constructor() {
        const accessToken: string | null = localStorage.getItem("accessToken");
        this.authAxios = axios.create({
            baseURL: AUTH_BASE_URL,
        });
        this.ledgerAxios = axios.create({
            baseURL: LEDGER_BASE_URL,
        });

        this.auth = new AuthAPI(this.authAxios, this);
        this.ledger = new LedgerAPI(this.ledgerAxios);

        // AuthAPI 인스턴스를 생성하고 나서 해야함
        if (accessToken) this.initializeUser(accessToken);
    }

    public async initializeUser(accessToken: string) {
        try {
            const user = await this.auth.getUser(accessToken);
            if (user && user.id && user.nickname) {
                useAuthStore.getState().setUser({
                    userId: user.id,
                    avatar: user.avatar ? user.avatar : null,
                    nickname: user.nickname,
                });
                useAuthStore.getState().setLoggedIn(true);
            } else {
                // 첫 앱 실행 시 토큰이 만료된 경우 처리 로직 추가 (로그인 화면으로 이동 등)
                console.log("첫 접속, 토큰 만료, 다시 로그인 하세요");
            }
        } catch (error) {
            // console.log(error);
            console.log("유저 데이터 가져오기 실패");
        }
    }
}

const api = new API();

export default api;

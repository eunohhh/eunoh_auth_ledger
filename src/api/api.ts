import axios from "axios";
import AuthAPI from "./api.auth";

const BASE_URL = "https://api.ballang.yoojinyoung.com";

class API {
    private axios;
    public auth;

    constructor() {
        this.axios = axios.create({
            baseURL: BASE_URL,
            withCredentials: true,
        });

        this.auth = new AuthAPI(this.axios);
    }
}

const api = new API();

export default api;

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
    }
}

const api = new API();

export default api;

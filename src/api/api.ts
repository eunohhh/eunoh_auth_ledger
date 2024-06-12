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
        this.authAxios = axios.create({
            baseURL: AUTH_BASE_URL,
        });
        this.ledgerAxios = axios.create({
            baseURL: LEDGER_BASE_URL,
        });

        this.auth = new AuthAPI(this.authAxios);
        this.ledger = new LedgerAPI(this.ledgerAxios);

        this.auth.initializeUser();
    }
}

const api = new API();

export default api;

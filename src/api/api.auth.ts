import { AuthData } from "@/types/d";
import { Axios } from "axios";

class AuthAPI {
    private axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async signUp(data: AuthData) {
        const path = "/auth/sign-up";

        const response = await this.axios.post(path, data);
        const result = response.data.result;

        return result;
    }
    // async logIn(data) {
    //     const path = "/auth/log-in";

    //     const response = await this.#axios.post(path, data);
    //     const result = response.data.result;

    //     return result;
    // }
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
}

export default AuthAPI;

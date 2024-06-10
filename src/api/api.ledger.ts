import { Axios, AxiosError } from "axios";

class LedgerAPI {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async getLedger() {
        try {
            const path = "/expenses";

            const response = await this.axios.get(path);
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

export default LedgerAPI;

import { Expend, LedgerState } from "@/types/d";
import { Axios, AxiosError } from "axios";

class LedgerAPI {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async getLedger(): Promise<Expend[]> {
        try {
            const path = "/expenses";

            const response = await this.axios.get<Expend[]>(path);
            const result = response.data;

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }

    async addLeger(newExpend: Expend[]): Promise<LedgerState> {
        try {
            const path = "/expenses";

            const response = await this.axios.post<LedgerState>(
                path,
                newExpend
            );
            const result = response.data;

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }

    async updateLeger(newExpend: Expend): Promise<LedgerState> {
        try {
            const path = "/expenses";

            const response = await this.axios.patch<LedgerState>(
                path,
                newExpend
            );
            const result = response.data;

            return result;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message || error.message);
            }
            throw new Error("An unexpected error occurred");
        }
    }

    async deleteLeger(expendId: string) {
        try {
            const path = `/expenses/${expendId}`;

            const response = await this.axios.delete(path);
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

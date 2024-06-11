export interface AuthData {
    id?: string;
    password?: string;
    nickname?: string;
    avatar?: File;
}

export interface User {
    userId: string;
    avatar: string | null;
    nickname: string;
}
export interface AxiosReturn {
    accessToken?: string;
    userId?: string;
    id?: string;
    message?: string;
    avatar?: string;
    nickname?: string;
    success: boolean;
}

export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User) => void;
    setLoggedIn: (isLoggedIn: boolean) => void;
    logOut: () => void;
}

export interface Expend {
    id: string;
    date: string;
    item: string;
    amount: number;
    description: string;
    day?: number;
}

export interface Ledger {
    expends: Expend[] | null;
    month: number;
    monthlyExpends: Expend[] | null;
    setExpends: (expends: Expend[]) => void;
    selectMonth: (selectedMonth: number) => void;
    addExpend: (newExpend: Expend) => void;
    deleteExpend: (expendId: string) => void;
    updateExpend: (newExpend: Expend) => void;
}

export interface LedgerState {
    expends: Expend[];
    month: number;
    monthlyExpends: Expend[];
}

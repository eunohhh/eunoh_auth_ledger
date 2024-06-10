export interface AuthData {
    id: string;
    password: string;
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
    user: {
        userId: string;
        avatar: string | null;
        nickname: string;
    } | null;
    isLoggedIn: boolean;
    setUser: (user: User) => void;
    setLoggedIn: (isLoggedIn: boolean) => void;
}

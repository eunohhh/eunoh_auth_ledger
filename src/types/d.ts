export interface AuthData {
    id: string;
    password: string;
    nickname?: string;
}

export interface User {
    userId: string;
    avatar: string | null;
    nickname: string;
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

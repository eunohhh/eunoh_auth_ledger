export interface AuthData {
    id: string;
    password: string;
    nickname?: string;
}

export interface AuthState {
    user: {
        userId: string;
        avatar: string | null;
        nickname: string;
    } | null;
    isLoggedIn: boolean;
    setUser: (user: {
        userId: string;
        avatar: string | null;
        nickname: string;
    }) => void;
    setLoggedIn: (isLoggedIn: boolean) => void;
}

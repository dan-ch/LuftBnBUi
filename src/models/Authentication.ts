export interface signUpData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface signInData {
    email: string;
    password: string;
}

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email:string;
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    token: string | null;
    refreshToken: string | null;
}
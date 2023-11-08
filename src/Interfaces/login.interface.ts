export interface LoginResponse {
    token: string;
    user: any;
    isLogged: boolean;
    expirationDate: Date;
}

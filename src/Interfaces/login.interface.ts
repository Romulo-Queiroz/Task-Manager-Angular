export interface LoginResponse {
    token: string;
    user: {
      id: number;
      username: string;
      isAdmin: boolean;
    };
    isLogged: boolean;
    expirationDate: Date;
  }
  
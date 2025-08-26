export interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  password: string;
  confirmPassword: string;
}

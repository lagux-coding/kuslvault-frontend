import api from "@/config/axios";

export const loginService = async (data: {
  username: string;
  password: string;
  remember?: boolean;
}) => {
  return await api.post("/auth/login", data, { withCredentials: true });
};

export const registerService = async (data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return await api.post("/auth/register", null, { withCredentials: true });
};

export const logoutService = async (token: string | null) => {
  return await api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );
};

export const verifyTokenService = async (token: string | null) => {
  return await api.post("/auth/verify", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const refreshTokenService = async () => {
  return await api.post("/auth/refresh", {}, { withCredentials: true });
};

export const loginGoogleService = async (credential: string, isRemember: boolean) => {
  return await api.post(
    `/auth/google?r=${isRemember}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${credential}`,
      },
      withCredentials: true,
    },
  );
};

export const forgotPasswordService = async (email: string) => {
  return await api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);
};

export const resetPasswordService = async (token: string) => {
  return await api.post(`/auth/reset-password?token=${encodeURIComponent(token)}`);
};

export const changePasswordService = async (
  token: string,
  data: {
    password: string;
    confirmPassword: string;
  },
) => {
  return await api.post(`/auth/change-password?token=${encodeURIComponent(token)}`, data);
};

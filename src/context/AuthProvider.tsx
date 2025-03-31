import React, { createContext, useEffect, useState } from "react";
import { logoutService, refreshTokenService, verifyTokenService } from "@/services/userService";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (accessToken: string) => void;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          await refreshTokenAndLogin();
          return;
        } else {
          const response = await verifyTokenService(token);

          if (response.data.status == 200) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            return;
          } else {
            clearAuthData();
          }
        }
      } catch (error: any) {
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const login = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };
  const logout = async () => {
    const token = localStorage.getItem("accessToken");
    await logoutService(token);
    clearAuthData();
  };
  const refreshTokenAndLogin = async () => {
    try {
      // If the token is expired, refresh the token
      const refreshResponse = await refreshTokenService();
      if (refreshResponse.data.status == 200) {
        login(refreshResponse.data.data.accessToken);
        return;
      }
      // If the refresh token is expired, logout
      clearAuthData();
    } catch (error) {
      clearAuthData();
    }
  };
  const clearAuthData = async () => {
    const token = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

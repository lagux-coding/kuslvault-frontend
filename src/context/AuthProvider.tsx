import React, { createContext, useEffect, useState } from "react";
import { logoutService, refreshTokenService, verifyTokenService } from "@/services/userService";
import axios from "axios";
import api from "@/config/axios";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
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
        const response = await verifyTokenService(token);

        if (response.data.status === 200) {
          setIsAuthenticated(true);
        } else {
          const refreshResponse = await refreshTokenService();

          if (refreshResponse.data.status === 200) {
            localStorage.setItem("accessToken", refreshResponse.data.data.accessToken);
            setIsAuthenticated(true);
          } else {
            console.log(refreshResponse.data.message);
            setIsAuthenticated(false);
          }
        }
      } catch (error: any) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = async () => {
    const token = localStorage.getItem("accessToken");
    await logoutService(token);
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

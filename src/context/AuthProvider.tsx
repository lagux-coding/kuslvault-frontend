import React, { createContext, useEffect, useState } from "react";
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
        const response = await api.get("/auth/verify", {
          withCredentials: true,
        });

        if (response.data.status === 200) {
          setIsAuthenticated(true);
        } else if (response.data.status === 2002) {
          setIsAuthenticated(false);
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
    await api.post("/auth/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

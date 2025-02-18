import { setAuthToken } from "@/services/api";
import React, { createContext, useState, ReactNode } from "react";
 

interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) throw new Error("Login failed");
  
      const data = await response.json();
      console.log("Login successful, setting token:", data.access);
      setAccessToken(data.access);
      setAuthToken(data.access);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${apiUrl}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
      });

      if (!response.ok) throw new Error("Token refresh failed");

      const data = await response.json();
      setAccessToken(data.access);
      setAuthToken(data.access);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  const logout = () => {
    setAccessToken(null);
    setAuthToken(null);  
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

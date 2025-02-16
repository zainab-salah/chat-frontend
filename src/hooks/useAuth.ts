import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const isAuthenticated = () => !!token;
  const getUser = () => (token ? jwtDecode<{ username: string }>(token) : null);

  return { token, login, logout, isAuthenticated, getUser };
}

import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from 'jwt-decode';
 
interface DecodedToken {
  exp: number;
  [key: string]: unknown;   
}

interface AuthState {
  accessToken: string;
  user: string;
  userId: string;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: {
    accessToken: "",
    user: "",
    userId: "",
  },
  setAuth: () => {},   
  logout: () => {},  
});

const isTokenExpired = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);   
    return decoded.exp * 1000 < Date.now();  
  } catch (error) {
    return true;  
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const storedToken = localStorage.getItem("accessToken") || "";
    const storedUser = localStorage.getItem("user") || "";
    const storedUserId = localStorage.getItem("userId") || "";

    // Check if token is expired on initial load
    if (storedToken && isTokenExpired(storedToken)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      return { accessToken: "", user: "", userId: "" };
    }

    return {
      accessToken: storedToken,
      user: storedUser,
      userId: storedUserId,
    };
  });

  useEffect(() => {
    if (auth.accessToken) {
      localStorage.setItem("accessToken", auth.accessToken);
      localStorage.setItem("user", auth.user);
      localStorage.setItem("userId", auth.userId);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }
  }, [auth]);

  const logout = () => {
    setAuth({ accessToken: "", user: "", userId: "" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

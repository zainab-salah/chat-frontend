import { api } from "@/services/api";
import useAuth from "./useAuth";

interface RefreshResponse {
  access: string;
}

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token found");
      return "";
    }

    try {
      const response = await api.post<RefreshResponse>(
        "/refresh/",
        { refresh: refreshToken },
        { withCredentials: true }
      );

      const newAccessToken = response.data.access;
      
      setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));

      localStorage.setItem("accessToken", newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error("Refresh failed:", error);
      return "";
    }
  };

  return refresh;
};

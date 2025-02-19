import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

interface UseDynamicQueryProps {
  key: string;
  endpoint: string;
  token?: string;
  params?: Record<string, unknown>;
  enabled?: boolean;
}

const useDynamicQuery = ({ key, endpoint, token, params = {}, enabled = true }: UseDynamicQueryProps) => {
  return useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      const response = await api.get(endpoint, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    },
    enabled: Boolean(token) && enabled,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export default useDynamicQuery;

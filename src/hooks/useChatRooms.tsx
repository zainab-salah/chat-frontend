import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchActiveChatRooms = async () => {
  const response = await api.get("/chatrooms/");
  return response.data;
};

export const useChatRooms = () =>
  useQuery({ queryKey: ["chatRooms"], queryFn: fetchActiveChatRooms });

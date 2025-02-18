import { useMutation } from "@tanstack/react-query";
import { api } from "./api";

const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/login/", { username, password });
  return response.data;
};


export const useLogin = () =>
  useMutation<void, Error, { username: string; password: string }>({
    mutationFn: loginUser,
  });

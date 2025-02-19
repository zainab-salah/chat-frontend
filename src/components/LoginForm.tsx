import { User } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: User) => {
    try {
      const response = await api.post(
        "/login/",
        JSON.stringify({ username: data.username, password: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.tokens?.access;
      const refreshToken = response?.data?.tokens?.refresh;
      const userId = response?.data?.user?.id;
      setAuth({ accessToken, user: data.username, userId: userId });

      // Store both tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", data.username);
      localStorage.setItem("userId", response?.data?.userId);

      toast({
        title: "Login successful!",
        description: "Create a new chat room or join an existing one.",
        variant: "success",
      });

      navigate("/chatrooms");
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register("username", { required: "Username is required" })}
        placeholder="Username"
        className="w-full"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <Input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
        className="w-full"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <Button type="submit" variant="default">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

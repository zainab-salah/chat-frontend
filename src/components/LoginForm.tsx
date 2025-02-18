import { User } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
    const { login } = useAuth();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<User>();
    const { toast } = useToast()
    const onSubmit = async (data: User) => {
      try {
        await login(data.username, data.password);
        console.log("Login successful!");
        toast({
            title: "Login successful!",
            description: "Create a new chat room or join an existing one.",
            variant: "success",
          })
      } catch (error) {
        console.log(error);
        toast({
            title: "Error",
            description: "Invalid username or password",
            variant: "destructive",
          })
      }
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <Input
      {...register("username", { required: "username is required" })}
      placeholder="username"
      className="w-full"
    />
    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

    <Input
      type="password"
      {...register("password", { required: "Password is required" })}
      placeholder="password"
      className="w-full"
    />
    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

    <Button type="submit" variant="default" >
      Login
    </Button>
  </form>
  );
};

export default LoginForm;

import { User } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register("username", { required: "username is required" })}
        placeholder="Enter your username"
        type="text"
        className="w-full"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <Input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Create a password"
        className="w-full"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <Button
        type="submit"
        variant="default"
  
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;

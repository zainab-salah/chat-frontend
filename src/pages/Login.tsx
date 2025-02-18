 
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
 
 

export default function Login() {
 const { login } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
          console.log("Login successful!");
        } catch (error) {
            console.log("Invalid credentials");
        }
      };

    return (
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Login</h2>
            <input type="text" name="username" placeholder="Username" className="border p-2" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="border p-2 mt-2" onChange={handleChange} />
            <button className="bg-blue-500 text-white p-2 mt-4"  >
                Login
            </button>
        </form>
    );
}

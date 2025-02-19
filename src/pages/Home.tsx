import { useEffect } from "react";
import { useNavigate } from "react-router-dom";  

import AnimatedBg from "@/components/AnimatedBg";
import AnimatedDiv from "@/components/AnimatedDiv";
import BlurReveal from "@/components/blur-reveal";
import LoginForm from "@/components/LoginForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignUpForm from "@/components/SignUpForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const { auth } = useAuth();
  const navigate = useNavigate();  
  useEffect(() => {
    if (auth.accessToken) {
      navigate("/chatrooms");
    }
  }, [auth.accessToken, navigate]);

  return (
    <AnimatedDiv>
      <MaxWidthWrapper className="flex md:min-h-screen py-10 relative overflow-hidden md:overflow-visible h-full items-center justify-center">
        <div className="flex flex-col md:flex-row items-center md:justify-between rounded-3xl h-full p-5 md:shadow-2xl w-full">
          <div className="relative z-20 md:p-8 w-full md:min-h-auto min-h-screen md:h-auto sm:max-w-[60%]">
            <BlurReveal
              text="Welcome to the chat app!"
              dec="Fill in the details to get started with the best chat app!"
            />

            <Tabs defaultValue="login">
              <TabsList className="mb-5 w-full flex justify-between gap-2 bg-transparent">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full absolute md:relative mt-0 md:top-auto object-cover top-1/2 md:h-full min-h-full">
            <AnimatedBg />
          </div>
        </div>
      </MaxWidthWrapper>
    </AnimatedDiv>
  );
}

import AnimatedBg from "@/components/AnimatedBg";
import LoginForm from "@/components/LoginForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper.tsx";
import SignUpForm from "@/components/SignUpForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  return (
    <MaxWidthWrapper className="flex md:min-h-screen py-10 relative overflow-hidden md:overflow-visible h-full  items-center justify-center">
      <div className="flex flex-col md:flex-row items-center md:justify-between  rounded-3xl h-full p-5 md:shadow-2xl w-full">
        <div className="  relative z-20 md:p-8 w-full md:min-h-auto min-h-screen md:h-auto sm:max-w-[60%] ">
          <h1 className="text-3xl font-bold text-start text-primary mb-4">
            Welcome
             {/* <span className="text-secondary">✌️</span> */}
          </h1>
          <p className="text-start text-sm text-gray-600 mb-6">
            Fill in the details to get started with the best chat app!
          </p>

          <Tabs defaultValue="login" className="">
            <TabsList className="mb-5 w-full flex justify-between gap-2  bg-transparent">
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
        <div className=" w-full absolute md:relative mt-0 md:top-auto object-cover top-1/2 md:h-full min-h-full">
          <AnimatedBg />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

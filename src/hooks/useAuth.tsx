 
import AuthContext from "@/context/AuthContext";
import { useContext, useDebugValue } from "react";
 
export const useAuth = (): any => {
    const context = useContext(AuthContext) as any;
    useDebugValue(context.auth, auth => auth?.user ? "Logged In" : "Logged Out");
    return context;
};

export default useAuth;
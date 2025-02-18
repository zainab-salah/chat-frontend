import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();
  return accessToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

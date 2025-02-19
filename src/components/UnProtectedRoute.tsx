import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { JSX } from "react";

const UnProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useAuth();
  return auth.user ? children : <Navigate to="/" />;
};

export default UnProtectedRoute;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AuthProvider>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
      </AuthProvider>
  </React.StrictMode>
);

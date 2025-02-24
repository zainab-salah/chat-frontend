import "./App.css";
import Layout from "./components/Layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppRoutes from "./routes";

export default function App() {
  return (
    <Layout>
      <ReactQueryDevtools initialIsOpen={false} />

      <AppRoutes />
    </Layout>
  );
}

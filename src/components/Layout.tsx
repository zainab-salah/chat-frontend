import { ReactNode } from "react";

import Footer from "./Footer";
import { Toaster } from "./ui/toaster";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
      <Navbar />
      <div className="flex-1 flex flex-col h-full">{children}</div>

      <Footer />
      <Toaster />
    </main>
  );
}

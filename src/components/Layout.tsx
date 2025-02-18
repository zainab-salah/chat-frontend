import { ReactNode } from "react";

import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
      <div className="flex-1 flex flex-col h-full">{children}</div>
      <Footer />
    </main>
  );
}

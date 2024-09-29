import { Navbar } from "@/src/components/navbar";
import React, { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <span className="flex items-center gap-1 text-current">
          <span className="text-default-600">&copy;</span>
          <p>2024</p>
        </span>
      </footer>
    </div>
  );
};

export default PublicLayout;

import { Navbar } from "@/src/components/navbar";
import React, { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container-box  pt-16">{children}</main>
    </div>
  );
};

export default PublicLayout;

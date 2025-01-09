"use client";

import { Navbar } from "@/src/components/navbar";
import React, { ReactNode } from "react";
import LeftSidebar from "@/src/components/shared/LeftSidebar";
import RightSidebar from "@/src/components/shared/RightSidebar/RightSidebar";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-full">
      <Navbar />
      <div className="flex container-box">
        {/* Left Sidebar */}

        <LeftSidebar />

        {/* Main Content */}
        <main className="overflow-y-auto mt-[130px] lg:mx-[250px] h-full">
          {children}
        </main>
        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default PublicLayout;

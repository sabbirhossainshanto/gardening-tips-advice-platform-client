"use client";

import React, { ReactNode } from "react";
import { Navbar } from "@/src/components/navbar";
import LeftSidebar from "@/src/components/shared/LeftSidebar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-full">
      <Navbar />
      <div className="flex container-box">
        {/* Left Sidebar */}

        <LeftSidebar />

        {/* Main Content */}
        <main className="overflow-y-auto mt-[130px] lg:mx-[250px] h-full w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

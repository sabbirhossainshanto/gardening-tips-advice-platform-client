"use client";

import React, { ReactNode } from "react";
import { Navbar } from "@/src/components/navbar";
import UserSidebar from "@/src/components/shared/UserSidebar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="lg:grid grid-cols-12 lg:border-t-1 border-gray-800 h-screen">
        <UserSidebar />
        <main className="col-span-10">{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;

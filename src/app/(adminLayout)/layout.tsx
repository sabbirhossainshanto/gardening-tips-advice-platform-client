"use client";

import React, { ReactNode } from "react";
import { Navbar } from "@/src/components/navbar";
import AdminSidebar from "@/src/components/shared/AdminSidebar";
import LeftSidebar from "@/src/components/shared/LeftSidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <div className="relative">
    //   <Navbar />
    //   <div className="lg:grid grid-cols-12 lg:border-t-1 border-gray-800 h-screen">
    //     <AdminSidebar />
    //     <main className="col-span-10">{children}</main>
    //   </div>
    // </div>
    <div className="relative flex flex-col h-full">
      <Navbar />
      <div className="flex container-box">
        {/* Left Sidebar */}

        <LeftSidebar />

        {/* Main Content */}
        <main className="overflow-y-auto mt-[100px] lg:ml-[225px] h-full w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

"use client";

import React, { ReactNode } from "react";
import { Navbar } from "@/src/components/navbar";
import AdminSidebar from "@/src/components/shared/AdminSidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="grid grid-cols-12 border-t-1 border-gray-800 h-screen">
        <AdminSidebar />
        <main className="col-span-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

"use client";
import { GalleryThumbnails, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:block  col-span-2  border-r-1 border-gray-800 pt-5">
      <Link
        href="/dashboard"
        className={`flex items-center gap-3 hover-nav-item px-3 py-2 ${pathname === "/dashboard" ? "bg-[#a8b3cf33]" : ""}`}
      >
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </Link>
      <Link
        href="/dashboard/user-management"
        className={`flex items-center gap-3 hover-nav-item px-3 py-2 ${pathname === "/dashboard/user-management" ? "bg-[#a8b3cf33]" : ""}`}
      >
        <User size={18} />
        <span>User Management</span>
      </Link>
      <Link
        href="/dashboard/post-management"
        className={`flex items-center gap-3 hover-nav-item px-3 py-2 ${pathname === "/dashboard/post-management" ? "bg-[#a8b3cf33]" : ""}`}
      >
        <GalleryThumbnails size={18} />
        <span>Post Management</span>
      </Link>
      <Link
        href="/dashboard/payment-history"
        className={`flex items-center gap-3 hover-nav-item px-3 py-2 ${pathname === "/dashboard/payment-history" ? "bg-[#a8b3cf33]" : ""}`}
      >
        <GalleryThumbnails size={18} />
        <span>Payment History</span>
      </Link>
      <Link
        href="/dashboard/profile-update"
        className={`flex items-center gap-3 hover-nav-item px-3 py-2 ${pathname === "/dashboard/profile-update" ? "bg-[#a8b3cf33]" : ""}`}
      >
        <GalleryThumbnails size={18} />
        <span>Profile Update</span>
      </Link>
    </div>
  );
};

export default AdminSidebar;

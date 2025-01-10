"use client";
import { GalleryThumbnails, HistoryIcon, User, User2 } from "lucide-react";
import Link from "next/link";

const AdminSidebar = () => {
  return (
    <>
      <Link
        href="/dashboard/user-management"
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
      >
        <User size={18} />
        <span className="text-lg font-medium">User Management</span>
      </Link>
      <Link
        href="/dashboard/post-management"
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
      >
        <GalleryThumbnails size={18} />
        <span className="text-lg font-medium">Post Management</span>
      </Link>
      <Link
        href="/dashboard/payment-history"
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
      >
        <HistoryIcon size={18} />
        <span className="text-lg font-medium">Payment History</span>
      </Link>
      <Link
        href="/dashboard/profile-update"
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
      >
        <User2 size={18} />
        <span className="text-lg font-medium">Profile Update</span>
      </Link>
    </>
  );
};

export default AdminSidebar;

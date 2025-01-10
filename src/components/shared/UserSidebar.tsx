"use client";
import { Home, User } from "lucide-react";
import Link from "next/link";

const UserSidebar = () => {
  return (
    <>
      <Link
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
        href="/profile"
      >
        <Home size={18} />
        <span className="text-lg font-medium">My Profile</span>
      </Link>
      <Link
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
        href="/profile/update-profile"
      >
        <User size={18} />
        <span className="text-lg font-medium">Update Profile</span>
      </Link>

      <Link
        href="/profile/favorite"
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
      >
        <User size={18} />
        <span className="text-lg font-medium">Favorite</span>
      </Link>
      <Link
        href="/profile/garden-journal"
        className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
      >
        <User size={18} />
        <span className="text-lg font-medium">Garden Journal</span>
      </Link>
    </>
  );
};

export default UserSidebar;

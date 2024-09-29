"use client";
import { Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="col-span-2  border-r-1 border-gray-800 pt-5">
      <Link
        href="/profile"
        className={`flex items-center gap-3 hover-nav-item px-3 py-2 ${pathname === "/profile" ? "bg-[#a8b3cf33]" : ""}`}
      >
        <Home size={18} />
        <span>My Feed</span>
      </Link>
      <Link
        href="/profile/update-profile"
        className={`flex items-center gap-3 hover-nav-item px-3 py-2 ${pathname === "/profile/update-profile" ? "bg-[#a8b3cf33]" : ""}`}
      >
        <User size={18} />
        <span>Update Profile</span>
      </Link>
    </div>
  );
};

export default UserSidebar;

"use client";

import assets from "@/src/assets";
import { useUser } from "@/src/context/user.provider";
import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

const LeftSidebar = () => {
  const { user } = useUser();

  return (
    <div className="hidden lg:block h-screen fixed top-[90px] left-0 overflow-y-auto lg:w-[300px] bg-white shadow-md ">
      <ul className="ml-[20px] h-full py-5 space-y-3">
        <Link
          className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
          href={user?.role === "ADMIN" ? "/dashboard" : "/profile"}
        >
          {user?.profilePhoto && (
            <Image
              height={25}
              width={25}
              className="rounded-full overflow-hidden object-contain"
              alt="profilePhoto"
              src={user?.profilePhoto}
            />
          )}
          <span className="text-lg font-medium">{user?.name}</span>
        </Link>
        {user?.role === "ADMIN" && <AdminSidebar />}
        {user?.role === "USER" && <UserSidebar />}
        <Link
          className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
          href="/saved"
        >
          <Image
            height={30}
            width={30}
            className=""
            alt="profilePhoto"
            src={assets.friends}
          />
          <span className="text-lg font-medium">Friends</span>
        </Link>
        <Link
          className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
          href="/saved"
        >
          <Image
            height={30}
            width={30}
            className=""
            alt="profilePhoto"
            src={assets.follower}
          />
          <span className="text-lg font-medium">Followers</span>
        </Link>
        <Link
          className="flex items-center  gap-3 hover:bg-gray-100 px-5 py-3"
          href="/saved"
        >
          <Image
            height={30}
            width={30}
            className=""
            alt="profilePhoto"
            src={assets.save}
          />
          <span className="text-lg font-medium">Bookmarked</span>
        </Link>
      </ul>
    </div>
  );
};

export default LeftSidebar;

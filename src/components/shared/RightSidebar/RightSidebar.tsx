"use client";

import Following from "./Following";
import Followers from "./Followers";
import FriendRequest from "./FriendRequest";

const RightSidebar = () => {
  return (
    <div className="hidden lg:block h-screen fixed top-[70px]   overflow-y-auto right-0 lg:w-[300px] bg-white shadow-md rounded-md">
      <FriendRequest />
      <Followers />
      <Following />
    </div>
  );
};

export default RightSidebar;

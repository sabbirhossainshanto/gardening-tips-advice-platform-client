import AllUsers from "@/src/components/ui/AllUsers/AllUsers";
import React, { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:grid grid-cols-12 mt-[100px]">
      <div className="col-span-8">{children}</div>
      <div className="col-span-4 p-5 mt-[100px]">
        <AllUsers />
      </div>
    </div>
  );
};

export default ProfileLayout;

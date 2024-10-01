import AllUsers from "@/src/components/ui/AllUsers/AllUsers";
import React, { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">{children}</div>
      <div className="col-span-4 p-5">
        <AllUsers />
      </div>
    </div>
  );
};

export default ProfileLayout;

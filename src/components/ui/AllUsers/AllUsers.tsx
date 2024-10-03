"use client";

import { Card as NextUiCard } from "@nextui-org/card";
import Tabs from "./Tabs";
import { useGetMe } from "@/src/hooks/profile";
import { useGetAllUsers } from "@/src/hooks/user";
import { IUser } from "@/src/types";

const AllUsers = () => {
  const { data: myProfile } = useGetMe();
  const { data } = useGetAllUsers();

  return (
    <NextUiCard
      isFooterBlurred
      className="h-[400px] w-full p-3 border border-gray-700 overflow-y-scroll"
    >
      <Tabs users={data?.data as IUser[]} myProfile={myProfile?.data} />
    </NextUiCard>
  );
};

export default AllUsers;

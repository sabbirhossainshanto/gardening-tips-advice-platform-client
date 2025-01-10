"use client";

import {
  useGetMyFollowings,
  useUnFollowUser,
} from "@/src/hooks/userRelationship";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const Following = () => {
  const { data, refetch } = useGetMyFollowings();
  const { mutate: unFollowUser } = useUnFollowUser();

  const handleUnFollowUser = (following: IUser) => {
    unFollowUser(following?._id, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  return (
    <ul className="mx-[20px] h-fit py-5 space-y-3 border-b pb-3 mb-20">
      <div className="flex items-center justify-between mt-5 ">
        <h5 className="text-black font-medium">Following</h5>
        <Link className="text-primary" href="/friend-request">
          See All
        </Link>
      </div>
      {data?.data?.map((following) => {
        return (
          <div key={following?._id} className="flex flex-col  gap-3 py-3">
            <div className="flex items-center gap-5">
              {" "}
              {following?.targetUser?.profilePhoto && (
                <Image
                  height={25}
                  width={25}
                  className="rounded-full overflow-hidden object-contain"
                  alt="profilePhoto"
                  src={following?.targetUser?.profilePhoto}
                />
              )}
              <span className="text-lg font-medium">
                {following?.targetUser?.name}
              </span>
            </div>
            <div className="flex gap-5">
              <Button
                radius="none"
                className="bg-[#0088ff] text-white font-medium px-8 rounded-3xl"
              >
                Following
              </Button>
              <Button
                onClick={() =>
                  handleUnFollowUser(following?.targetUser as IUser)
                }
                radius="none"
                className=" text-gray-700 font-medium px-8 rounded-3xl"
              >
                Unfollow
              </Button>
            </div>
          </div>
        );
      })}
      {data?.data?.length === 0 && <p>You are not following anyone</p>}
    </ul>
  );
};

export default Following;

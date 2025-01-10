"use client";

import { useGetPendingFriend } from "@/src/hooks/userRelationship";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendRequest = () => {
  const { data } = useGetPendingFriend();

  return (
    <ul className="mx-[20px] h-fit py-5 space-y-3 border-b pb-3">
      <div className="flex items-center justify-between mt-5 ">
        <h5 className="text-black font-medium">Friend Request</h5>
        <Link className="text-primary" href="/friend-requests">
          See All
        </Link>
      </div>

      {data?.data?.map((pendingFriend) => {
        return (
          <div key={pendingFriend?._id} className="flex flex-col  gap-3 py-3">
            <div className="flex items-center gap-5">
              {" "}
              {pendingFriend?.user?.profilePhoto && (
                <Image
                  height={25}
                  width={25}
                  className="rounded-full overflow-hidden object-contain"
                  alt="profilePhoto"
                  src={pendingFriend?.user?.profilePhoto}
                />
              )}
              <span className="text-lg font-medium">
                {pendingFriend?.user?.name}
              </span>
            </div>
            <div className="flex gap-5">
              <Button
                radius="none"
                className="bg-primary text-white font-medium px-8 rounded-3xl"
              >
                Confirm
              </Button>
              <Button
                radius="none"
                className=" text-gray-700 font-medium px-8 rounded-3xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        );
      })}
      {data?.data?.length === 0 && <p>You dont have any friend request</p>}
    </ul>
  );
};

export default FriendRequest;

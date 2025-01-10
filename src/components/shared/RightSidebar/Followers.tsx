"use client";

import { useGetMyFollowers } from "@/src/hooks/userRelationship";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Followers = () => {
  const { data } = useGetMyFollowers();

  return (
    <ul className="mx-[20px] h-fit py-5 space-y-3 border-b pb-3">
      <div className="flex items-center justify-between mt-5 ">
        <h5 className="text-black font-medium">Followers</h5>
        <Link className="text-primary" href="/followers">
          See All
        </Link>
      </div>
      {data?.data?.map((follower) => {
        return (
          <div key={follower?._id} className="flex flex-col  gap-3 py-3">
            <div className="flex items-center gap-5">
              {" "}
              {follower?.user?.profilePhoto && (
                <Image
                  height={25}
                  width={25}
                  className="rounded-full overflow-hidden object-contain"
                  alt="profilePhoto"
                  src={follower?.user?.profilePhoto}
                />
              )}
              <span className="text-lg font-medium">
                {follower?.user?.name}
              </span>
            </div>
          </div>
        );
      })}
      {data?.data?.length === 0 && <p>You dont have any follower</p>}
    </ul>
  );
};

export default Followers;

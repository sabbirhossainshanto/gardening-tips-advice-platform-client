"use client";

import { useFollowUnfollow } from "@/src/hooks/follow";
import { useGetMe } from "@/src/hooks/profile";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import { CardHeader, Card as NextUiCard } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import React from "react";

const PostUser = ({ postUser }: { postUser: IUser }) => {
  const router = useRouter();
  const { data } = useGetMe();
  const { mutate } = useFollowUnfollow();
  const handleFollowUnFollow = (id: string) => {
    mutate({ followingId: id });
  };

  const isAlreadyFollowed = postUser?.followers?.find(
    (follower) => follower?._id === data?.data?._id
  );
  return (
    <NextUiCard isFooterBlurred className=" w-full p-3 border border-gray-700">
      <CardHeader className="flex-col items-start">
        <h4 className="mt-2  p-1 text-2xl font-medium ">{postUser?.name}</h4>
      </CardHeader>

      <div
        key={postUser?._id}
        className="flex items-center justify-between mt-2"
      >
        <Image className="size-12 rounded-full" src={postUser?.profilePhoto} />
        <div>
          <h1>{postUser?.name}</h1>
        </div>
        <Button
          onClick={() => router.push(`/all-post/${postUser?._id}`)}
          className="rounded-full"
        >
          See Posts
        </Button>
        {data?.data?._id !== postUser?._id && (
          <Button
            onClick={() => handleFollowUnFollow(postUser?._id)}
            className="rounded-full"
          >
            {isAlreadyFollowed ? "  Following" : "  Follow"}
          </Button>
        )}
      </div>
    </NextUiCard>
  );
};

export default PostUser;

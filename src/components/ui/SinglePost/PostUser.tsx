"use client";

import { useUser } from "@/src/context/user.provider";
import { useFollowUnfollow } from "@/src/hooks/follow";
import { useGetMe } from "@/src/hooks/profile";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import { CardHeader, Card as NextUiCard } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PostUser = ({ postUser }: { postUser: IUser }) => {
  const router = useRouter();
  const { user } = useUser();
  const { data } = useGetMe(user?.email as string);
  const { mutate } = useFollowUnfollow();
  const handleFollowUnFollow = (id: string) => {
    if (user?.email) {
      mutate({ followingId: id });
    } else {
      toast.error("Please login to follow user!");
    }
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
          onClick={() => router.push(`/all-posts/${postUser?._id}`)}
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

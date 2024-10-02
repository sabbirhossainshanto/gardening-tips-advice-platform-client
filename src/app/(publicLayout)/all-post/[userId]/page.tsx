import PostCard from "@/src/components/shared/PostCard";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IPost } from "@/src/types";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {
  const { data }: any = await nexiosInstance.get(
    `/posts/user/${params.userId}`
  );
  return (
    <div className="w-full grid justify-center gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-5">
      {data?.data?.map((post: IPost) => (
        <PostCard key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default page;

"use client";

import PostCard from "@/src/components/shared/PostCard";
import { useGetMe } from "@/src/hooks/profile";
import { IPost } from "@/src/types";

const FavoritePosts = () => {
  const { data }: any = useGetMe();
  return (
    <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
      {data?.data?.favorites?.map((post: IPost) => (
        <PostCard key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default FavoritePosts;

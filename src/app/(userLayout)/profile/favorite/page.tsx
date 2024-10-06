"use client";

import PostCard from "@/src/components/shared/PostCard";
import { useUser } from "@/src/context/user.provider";
import { useGetMe } from "@/src/hooks/profile";
import { IPost } from "@/src/types";

const FavoritePosts = () => {
  const { user } = useUser();
  const { data } = useGetMe(user?.email as string);

  return (
    <div>
      {data?.data?.favorites && data?.data?.favorites?.length > 0 ? (
        <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
          {data?.data?.favorites?.map((post: IPost) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <h2>You dont have any favorite post yet!</h2>
        </div>
      )}
    </div>
  );
};

export default FavoritePosts;

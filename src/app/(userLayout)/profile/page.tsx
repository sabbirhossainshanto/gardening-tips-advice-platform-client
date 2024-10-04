"use client";

import PostCard from "@/src/components/shared/PostCard";
import { useGetMyPost } from "@/src/hooks/post";
import { IPost } from "@/src/types";

const Profile = async () => {
  const { data } = useGetMyPost();

  return (
    <div>
      <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
        {data?.data?.map((post: IPost) => {
          return <PostCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Profile;

"use client";

import PostCard from "@/src/components/shared/PostCard";
import { useGetMyPost } from "@/src/hooks/post";
import { IPost } from "@/src/types";

const Profile = () => {
  const { data } = useGetMyPost();
  console.log(data);
  return (
    <div>
      {data?.data?.length > 0 ? (
        <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
          {data?.data?.map((post: IPost) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <h2>You dont have any post yet!</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;

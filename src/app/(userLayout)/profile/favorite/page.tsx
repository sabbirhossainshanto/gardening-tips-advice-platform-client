import PostCard from "@/src/components/shared/PostCard";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IPost } from "@/src/types";

const FavoritePosts = async () => {
  const { data }: any = await nexiosInstance.get("/profile");
  return (
    <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
      {data?.data?.favorites?.map((post: IPost) => (
        <PostCard key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default FavoritePosts;

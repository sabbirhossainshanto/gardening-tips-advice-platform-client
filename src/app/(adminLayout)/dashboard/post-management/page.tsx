import PostCard from "@/src/components/shared/PostCard";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IPost } from "@/src/types";

export default async function PostManagement() {
  const { data }: any = await nexiosInstance.get("/posts");

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="w-full grid justify-center gap-10 sm:grid-cols-1 lg:grid-cols-2 p-3">
        {data?.data?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </section>
  );
}

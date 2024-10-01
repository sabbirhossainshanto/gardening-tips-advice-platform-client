import PostCard from "@/src/components/shared/PostCard";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IPost } from "@/src/types";

export default async function PostManagement() {
  const { data }: any = await nexiosInstance.get("/posts");

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className=" grid justify-center gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-5">
        {data?.data?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </section>
  );
}

"use client";
import PostCard from "@/src/components/shared/PostCard";
import { useUser } from "@/src/context/user.provider";
import { useGetAllPost } from "@/src/hooks/post";
import useDebounce from "@/src/hooks/useDebounce";
import { IPost } from "@/src/types";

export default function Home() {
  const { query } = useUser();
  const debouncedSearchTerm = useDebounce(query.searchTerm, 500);
  const debouncedQuery = {
    ...query,
    searchTerm: debouncedSearchTerm,
  };
  const { data } = useGetAllPost(debouncedQuery);
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="w-full grid justify-center gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-5">
        {data?.data?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </section>
  );
}

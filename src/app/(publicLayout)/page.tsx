"use client";
import CardSkeleton from "@/src/components/CardSkeleton";
import NewsFeed from "@/src/components/shared/NewsFeed";
import PostCard from "@/src/components/shared/PostCard";
import { useUser } from "@/src/context/user.provider";
import { useGetAllPost } from "@/src/hooks/post";
import useDebounce from "@/src/hooks/useDebounce";
import { IPost } from "@/src/types";

export default function Home() {
  const { query } = useUser();

  const debouncedSearchTerm = useDebounce(query.searchTerm, 200);
  const debouncedQuery = {
    ...query,
    searchTerm: debouncedSearchTerm,
  };

  const { data, isLoading } = useGetAllPost(debouncedQuery);

  return (
    <section className="flex flex-col  gap-4">
      <NewsFeed />

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="w-full grid  gap-10 md:grid-cols-1">
          {data?.data?.map((post: IPost) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </div>
      )}

      {/* <div className="my-20">
        <div className="section-title my-8">
          <h2 className="mb-2 text-center text-2xl">Recent gardening images</h2>
          <p className="text-center">
            A list of gardening image that have been recently found and
            reported.
          </p>
        </div>
        <GardeningImageGallery />
        <GardeningQuotes />
      </div> */}
    </section>
  );
}

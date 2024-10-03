"use client";
import GardeningImageGallery from "@/src/components/GardeningImageGallery";
import GardeningQuotes from "@/src/components/GardeningQuotes";
import CreatePost from "@/src/components/modal/CreatePost";
import PostCard from "@/src/components/shared/PostCard";
import SortByUpVotes from "@/src/components/ui/SortByUpVotes/SortByUpVotes";
import { useUser } from "@/src/context/user.provider";
import { useGetAllPost } from "@/src/hooks/post";
import useDebounce from "@/src/hooks/useDebounce";
import { IPost } from "@/src/types";

export default function Home() {
  const { query, user } = useUser();
  const debouncedSearchTerm = useDebounce(query.searchTerm, 500);
  const debouncedQuery = {
    ...query,
    searchTerm: debouncedSearchTerm,
  };
  const { data } = useGetAllPost(debouncedQuery);
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex justify-between w-full container-box">
        {user?.email && <CreatePost />}
        <SortByUpVotes />
      </div>
      <div className="w-full grid justify-center gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-5">
        {data?.data?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
      <div className="my-20">
        <div className="section-title my-8">
          <h2 className="mb-2 text-center text-2xl">Recent gardening images</h2>
          <p className="text-center">
            A list of gardening image that have been recently found and
            reported.
          </p>
        </div>
        <GardeningImageGallery />
        <GardeningQuotes />
      </div>
    </section>
  );
}

"use client";
import CardSkeleton from "@/src/components/CardSkeleton";
import GardeningImageGallery from "@/src/components/GardeningImageGallery";
import GardeningQuotes from "@/src/components/GardeningQuotes";
import CreatePost from "@/src/components/modal/CreatePost";
import PostCard from "@/src/components/shared/PostCard";
import SortByUpVotes from "@/src/components/ui/SortByUpVotes/SortByUpVotes";
import { useUser } from "@/src/context/user.provider";
import { useGetAllPost } from "@/src/hooks/post";
import useDebounce from "@/src/hooks/useDebounce";
import { IPost } from "@/src/types";
import { Spinner } from "@nextui-org/react";
import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { query, setQuery, user } = useUser();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [ref, inView] = useInView();

  const debouncedSearchTerm = useDebounce(query.searchTerm, 200);
  const debouncedQuery = {
    ...query,
    searchTerm: debouncedSearchTerm,
  };

  const { data, isFetching, isLoading, isPending } =
    useGetAllPost(debouncedQuery);

  // useEffect(() => {
  //   if (inView && !isFetching && !isLoading && !isPending) {
  //     setQuery({
  //       ...query,
  //       page: query.page + 1,
  //     });
  //   }
  // }, [inView]);

  // useEffect(() => {
  //   if (data?.data && data?.data?.length > 0) {
  //     if (!query?.searchTerm) {
  //       setPosts((prev) => [...prev, ...data?.data!]);
  //     } else {
  //       setPosts(data?.data);
  //     }
  //   }
  // }, [data]);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex justify-between w-full container-box">
        {user?.email && <CreatePost />}
        <SortByUpVotes />
      </div>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <Suspense fallback={<CardSkeleton />}>
          <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-5">
            {data?.data?.map((post: IPost) => (
              <PostCard key={post?._id} post={post} />
            ))}
          </div>
        </Suspense>
      )}

      {/* <Spinner ref={ref} size="lg" /> */}
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

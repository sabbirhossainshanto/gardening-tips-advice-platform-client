"use client";
import CardSkeleton from "@/src/components/CardSkeleton";
// import CardSkeleton from "@/src/components/CardSkeleton";
import GardeningImageGallery from "@/src/components/GardeningImageGallery";
import GardeningQuotes from "@/src/components/GardeningQuotes";
import CreatePost from "@/src/components/modal/CreatePost";
import PostCard from "@/src/components/shared/PostCard";
import SortByUpVotes from "@/src/components/ui/SortByUpVotes/SortByUpVotes";
import { useUser } from "@/src/context/user.provider";
import { useGetAllPost } from "@/src/hooks/post";
import useDebounce from "@/src/hooks/useDebounce";
import { IPost } from "@/src/types";
import { useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    query,
    // setQuery,
    user,
    // posts,
    // setPosts,
    // total,
    // setTotal,
    // currentCount,
    // setCurrentCount,
  } = useUser();

  const debouncedSearchTerm = useDebounce(query.searchTerm, 200);
  const debouncedQuery = {
    ...query,
    searchTerm: debouncedSearchTerm,
  };

  const { data, isFetched, refetch, isLoading } = useGetAllPost(debouncedQuery);

  // useEffect(() => {
  //   if (data?.data && data?.data?.length > 0) {
  //     setPosts((prevPosts) => [...prevPosts, ...data.data!]);
  //     setTotal(data?.meta?.total);
  //     setCurrentCount((prevCount) => prevCount + data.data!.length);
  //     setQuery({
  //       ...query,
  //       page: query.page + 1,
  //     });
  //   }
  // }, [data, isFetched]);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex justify-between w-full container-box">
        {user?.email && <CreatePost />}
        <SortByUpVotes />
      </div>

      {/* <InfiniteScroll
        dataLength={posts?.length}
        next={() => {
          setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
          refetch();
        }}
        hasMore={currentCount !== total}
        loader={<CardSkeleton />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more post available!</b>
          </p>
        }
      >
        <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-5">
          {posts?.map((post: IPost) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </div>
      </InfiniteScroll> */}

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-5">
          {data?.data?.map((post: IPost) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </div>
      )}

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

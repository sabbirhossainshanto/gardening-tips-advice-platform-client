"use client";

import { usePDF } from "react-to-pdf";
import { FaFilePdf } from "react-icons/fa6";
import { IPost, IUpdateVote } from "@/src/types";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import {
  Bookmark,
  DownVote,
  EyeIcon,
  FillBookmark,
  FillDownVote,
  FillUpVote,
  UpVote,
} from "../icons";
import { useAddBookmark, useAddVote, useDeletePost } from "@/src/hooks/post";
import { useUser } from "@/src/context/user.provider";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe } from "@/src/hooks/profile";
import { useRouter } from "next/navigation";
import handleCopyPostURL from "@/src/utils/handleCopyPostURL";

const PostCard = ({ post }: { post: IPost }) => {
  const { toPDF, targetRef } = usePDF({ filename: "post.pdf" });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, query } = useUser();
  const { data } = useGetMe();
  const { mutate: handleAddVote } = useAddVote();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: addToBookmark } = useAddBookmark();

  const favoritesPost: string[] | undefined =
    data?.data && data?.data?.favorites?.map((post: IPost) => post._id);

  const handleVoteUpdate = (voteType: "upvote" | "downvote") => {
    if (user?.email) {
      if (user?._id !== post?.user?._id) {
        const votePayload: IUpdateVote = {
          postId: post?._id as string,
          userId: user?._id as string,
          voteType,
        };
        handleAddVote(votePayload, {
          onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["upvoters"] });
          },
        });
      } else {
        toast.error(`You cant ${voteType} on your post!`);
      }
    } else {
      toast.error(`Please login to ${voteType} the post!`);
    }
  };

  const handleDeletePost = (id: string) => {
    deletePost(id, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: [`GET_ALL_POST`, query] });
      },
    });
  };

  const handleAddBookmark = (id: string) => {
    if (user?.email) {
      if (user?._id !== post?.user?._id) {
        addToBookmark(
          { postId: id },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["user"] });
            },
          }
        );
      } else {
        toast.error("Your cant bookmark your post!");
      }
    } else {
      toast.error("Please login to bookmark the post!");
    }
  };

  const isUserUpVoted = post?.upvotes?.find(
    (upvote) => upvote._id === user?._id
  );
  const isUserDownVoted = post?.downvotes?.find(
    (downvote) => downvote._id === user?._id
  );

  const handleNavigateToDetailsPage = (id: string) => {
    router.push(`/${id}`);
  };

  const contentHTML = { __html: post?.content };

  return (
    <>
      <NextUiCard
        ref={targetRef}
        isFooterBlurred
        className="h-[400px] w-full p-3 border border-gray-700 "
      >
        <CardHeader className="flex-col items-start">
          <h4 className="mt-2  p-1 text-2xl font-medium ">{post.title}</h4>
          <p className="absolute -top-0 right-1  px-2 text-tiny uppercase">
            {user?._id === post?.user?._id && "My Post"}
          </p>
        </CardHeader>
        <CardBody>
          <div
            className="post-card mb-5"
            dangerouslySetInnerHTML={contentHTML}
          />
          <Image
            removeWrapper
            alt="Card example background"
            className="h-[200px] w-full object-cover"
            src={post.imageUrl}
          />
        </CardBody>

        <CardFooter className="text-small justify-between mt-auto bg-[#a8b3cf33]">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center rounded-12 bg-surface-float">
              <button
                onClick={() => handleVoteUpdate("upvote")}
                className=" inline-flex cursor-pointer select-none flex-row
        items-center   transition
        duration-200 ease-in-out  justify-center font-bold h-8 px-3 rounded-10  pointer-events-auto !pl-1 !pr-3"
              >
                <span className="pointer-events-none relative">
                  {isUserUpVoted ? <FillUpVote /> : <UpVote />}
                </span>
                <span
                  className={`flex h-5 min-w-[1ch] flex-col overflow-hidden ml-1.5 tabular-nums ${isUserUpVoted ? "text-[#39e58c]" : ""}`}
                >
                  {post?.upvotes?.length}
                </span>
              </button>
              <div className="box-border border border-gray-500 border-surface-float py-2.5" />
              <button
                onClick={() => handleVoteUpdate("downvote")}
                className=" inline-flex flex-row
        items-center transition
        duration-200 ease-in-out  justify-center font-bold  h-8 w-8 p-0 rounded-10  pointer-events-auto !pl-3"
              >
                <span className="pointer-events-none relative">
                  {" "}
                  {isUserDownVoted ? <FillDownVote /> : <DownVote />}
                </span>

                <span
                  className={`flex h-5 min-w-[1ch] flex-col overflow-hidden ml-1.5 tabular-nums ${isUserDownVoted ? "text-[#e04337]" : ""}`}
                >
                  {post?.downvotes?.length}
                </span>
              </button>
            </div>
            <div className="flex flex-row items-stretch select-none">
              <button onClick={() => handleNavigateToDetailsPage(post?._id)}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 pointer-events-none"
                >
                  <path
                    d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z"
                    fill="currentcolor"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row items-stretch select-none">
              <button onClick={() => handleNavigateToDetailsPage(post?._id)}>
                <EyeIcon />
              </button>
            </div>
            <div className="flex flex-row items-stretch select-none">
              <button onClick={() => handleAddBookmark(post?._id)}>
                {favoritesPost?.includes(post?._id) ? (
                  <FillBookmark />
                ) : (
                  <Bookmark />
                )}

                {/**/}
              </button>
            </div>
            <button onClick={() => handleCopyPostURL(post?._id)}>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 pointer-events-none"
              >
                <path
                  d="M13.2 4.096a3.743 3.743 0 015.148-.137l.144.137 1.412 1.412a3.743 3.743 0 01.137 5.148l-.137.144-4.023 4.023a3.743 3.743 0 01-5.148.137l-.144-.137-.706-.706a.749.749 0 01.982-1.125l.076.067.706.705c.84.84 2.181.876 3.063.105l.113-.105 4.022-4.022c.84-.84.876-2.181.105-3.064l-.105-.112-1.411-1.411a2.246 2.246 0 00-3.063-.105l-.113.105L13.2 6.213a.749.749 0 01-1.126-.982l.067-.076L13.2 4.096zM8.119 9.177a3.743 3.743 0 015.148-.137l.144.137.706.706a.749.749 0 01-.982 1.125l-.076-.067-.706-.705a2.246 2.246 0 00-3.063-.105l-.113.105-4.022 4.022a2.246 2.246 0 00-.105 3.064l.105.112 1.411 1.411c.84.84 2.181.876 3.063.105l.113-.105 1.058-1.058a.749.749 0 011.126.982l-.067.076-1.059 1.059a3.743 3.743 0 01-5.148.137l-.144-.137-1.412-1.412a3.743 3.743 0 01-.137-5.148l.137-.144L8.12 9.177z"
                  fill="currentcolor"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <button onClick={() => toPDF()}>
              <FaFilePdf size={17} />
            </button>
            {user?._id === post?.user?._id || user?.role === "ADMIN" ? (
              <button onClick={() => handleDeletePost(post?._id)}>
                <DeleteIcon className="text-[#e04337]" />
              </button>
            ) : null}
          </div>
        </CardFooter>
      </NextUiCard>
    </>
  );
};

export default PostCard;

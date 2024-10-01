/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { IPost, IUpdateVote } from "@/src/types";
import { Card as NextUiCard, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import {
  Bookmark,
  DownVote,
  FillBookmark,
  FillDownVote,
  FillUpVote,
  UpVote,
} from "../../icons";
import { useAddBookmark, useAddVote, useDeletePost } from "@/src/hooks/post";
import { useUser } from "@/src/context/user.provider";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe } from "@/src/hooks/profile";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useAddComment, useGetAllComment } from "@/src/hooks/comment";
import { ICommentPayload } from "@/src/types/comment";
import { useState } from "react";
import Comment from "../Comment/Comment";

const SinglePost = ({ post }: { post: IPost }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const {
    mutate: addComment,
    isPending: isCommentSuccess,
    isSuccess: isCommentPending,
  } = useAddComment();
  const { user } = useUser();
  const { data } = useGetMe();
  const { mutate: handleAddVote } = useAddVote();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: addToBookmark } = useAddBookmark();
  const { data: commentData } = useGetAllComment();

  const favoritesPost: string[] = data?.data?.favorites?.map(
    (post: IPost) => post._id
  );

  const handleVoteUpdate = (voteType: "upvote" | "downvote") => {
    if (user?.email) {
      const votePayload: IUpdateVote = {
        postId: post?._id as string,
        userId: user?._id as string,
        voteType,
      };
      handleAddVote(votePayload);
    } else {
      toast.error(`Please login to ${voteType} the post!`);
    }
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const handleAddBookmark = (id: string) => {
    if (user?.email) {
      addToBookmark(
        { postId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
          },
        }
      );
    } else {
      toast.error("Please login to bookmark the post!");
    }
  };

  const handleAddComment = (id: string) => {
    if (comment) {
      const commentData = {
        comment,
        post: id,
        user: user?._id,
      };
      addComment(commentData);
    } else {
      toast.error("Please enter a comment!");
    }
  };

  const isUserUpVoted = post?.upvotes?.find(
    (upvote) => upvote._id === user?._id
  );
  const isUserDownVoted = post?.downvotes?.find(
    (downvote) => downvote._id === user?._id
  );

  console.log(commentData);

  return (
    <>
      <NextUiCard
        isFooterBlurred
        className=" w-full p-3 border border-gray-700"
      >
        <CardHeader className="flex-col items-start">
          <h4 className="mt-2  p-1 text-2xl font-medium ">{post.title}</h4>
          <p className="absolute -top-0 right-1  px-2 text-tiny uppercase">
            {user?._id === post?.user?._id && "My Post"}
          </p>
        </CardHeader>

        <Image
          removeWrapper
          alt="Card example background"
          className="h-[200px] w-full object-cover"
          src={post.imageUrl}
        />
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
                className=" inline-flex cursor-pointer select-none flex-row
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
              <button
                onClick={() => handleAddBookmark(post?._id)}
                className="inline-flex cursor-pointer select-none flex-row
        items-center transition
        duration-200 ease-in-out justify-center font-bold y h-8 w-8 p-0 rounded-10 "
              >
                {favoritesPost?.includes(post?._id) ? (
                  <FillBookmark />
                ) : (
                  <Bookmark />
                )}

                {/**/}
              </button>
            </div>
            <button
              className="inline-flex cursor-pointer select-none flex-row
        items-center  transition
        duration-200 ease-in-out justify-center font-boldh-8 w-8 p-0 rounded-10"
            >
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
            {user?._id === post?.user?._id || user?.role === "ADMIN" ? (
              <button
                onClick={() => handleDeletePost(post?._id)}
                className="inline-flex cursor-pointer select-none flex-row
          items-center  transition
          duration-200 ease-in-out justify-center font-boldh-8 w-8 p-0 rounded-10"
              >
                <DeleteIcon className="text-[#e04337]" />
              </button>
            ) : null}
          </div>
        </CardFooter>

        <div className="flex items-center justify-between gap-3 mt-4">
          <Input
            onChange={(e) => setComment(e.target.value)}
            size="sm"
            label="Comment"
            name="comment"
            type="text"
          />
          <Button
            onClick={() => handleAddComment(post?._id)}
            isLoading={isCommentPending && !isCommentSuccess ? true : false}
            type="submit"
            size="lg"
          >
            Comment
          </Button>
        </div>
        {commentData?.data && commentData?.data?.length > 0 && (
          <div className="flex flex-col max-h-[400px] overflow-y-scroll  my-5 rounded-md space-y-5">
            {commentData?.data?.map((comment) => (
              <Comment key={comment?._id} comment={comment} />
            ))}
          </div>
        )}
      </NextUiCard>
    </>
  );
};

export default SinglePost;

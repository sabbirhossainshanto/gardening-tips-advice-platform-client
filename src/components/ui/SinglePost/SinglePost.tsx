/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { usePDF } from "react-to-pdf";
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
  FillBookmark,
  FillDownVote,
  FillUpVote,
  UpVote,
} from "../../icons";
import { useAddBookmark, useAddVote } from "@/src/hooks/post";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe } from "@/src/hooks/profile";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useAddComment, useGetAllComment } from "@/src/hooks/comment";
import { useState } from "react";
import Comment from "../Comment/Comment";
import PostUser from "./PostUser";
import PostActions from "../../modal/PostActions";
import UpdatePost from "../../modal/UpdatePost";
import { useShowUpdatePostModal } from "@/src/store/updatePostModal";
import { EditIcon } from "lucide-react";

const SinglePost = ({ post }: { post: IPost }) => {
  const { toPDF, targetRef } = usePDF({ filename: "post.pdf" });
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const {
    mutate: addComment,
    isPending: isCommentPending,
    isSuccess: isCommentSuccess,
  } = useAddComment();
  const { user } = useUser();
  const { data } = useGetMe(user?.email as string);
  const { mutate: handleAddVote } = useAddVote();
  const { mutate: addToBookmark } = useAddBookmark();
  const { data: commentData } = useGetAllComment();
  const [showModal, setShowModal] = useShowUpdatePostModal();
  const [postId, setPostId] = useState("");

  const favoritesPost: string[] | undefined = data?.data?.favorites?.map(
    (post: IPost) => post._id
  );

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
        toast.error(`You can ${voteType} on your post!`);
      }
    } else {
      toast.error(`Please login to ${voteType} the post!`);
    }
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
        toast.error("You cant bookmark your post!");
      }
    } else {
      toast.error("Please login to bookmark the post!");
    }
  };

  const handleAddComment = (id: string) => {
    if (user?.email) {
      if (comment) {
        if (user?._id !== post?.user?._id) {
          const commentData = {
            comment,
            post: id,
            user: user?._id,
          };
          addComment(commentData, {
            onSuccess() {
              queryClient.invalidateQueries({ queryKey: ["get_comments"] });
            },
          });
        } else {
          toast.error("You cant comment on your post!");
        }
      } else {
        toast.error("Please enter a comment!");
      }
    } else {
      toast.error("Please login to comment!");
    }
  };

  const isUserUpVoted = post?.upvotes?.find(
    (upvote) => upvote._id === user?._id
  );
  const isUserDownVoted = post?.downvotes?.find(
    (downvote) => downvote._id === user?._id
  );
  const contentHTML = { __html: post?.content };
  return (
    <>
      {showModal && postId && (
        <UpdatePost postId={postId} setPostId={setPostId} />
      )}
      <div className="md:grid md:grid-cols-12 gap-4 mb-5">
        <div className="col-span-8">
          <NextUiCard
            ref={targetRef}
            isFooterBlurred
            className=" w-full p-3 border border-gray-700"
          >
            <CardHeader className="flex-col items-start">
              <h4 className="mt-2  p-1 text-2xl font-medium ">{post?.title}</h4>
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
                src={post?.imageUrl}
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
                  </button>
                </div>
                {user?._id === post?.user?._id ? (
                  <EditIcon
                    size={18}
                    onClick={() => {
                      setPostId(post?._id);
                      setShowModal(true);
                    }}
                    className="text-success cursor-pointer"
                  />
                ) : null}
                <PostActions post={post} toPDF={toPDF} />
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
        </div>
        <div className="md:col-span-4 mt-10 md:mt-0">
          <PostUser postUser={post?.user} />
        </div>
      </div>
    </>
  );
};

export default SinglePost;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* TODO--> not using */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Input,
} from "@nextui-org/react";
import {
  Bookmark,
  DeleteIcon,
  DownVote,
  FillBookmark,
  FillDownVote,
  FillUpVote,
  UpVote,
} from "../icons";
import GTForm from "../form/GTForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddBookmark,
  useAddVote,
  useDeletePost,
  useGetSInglePost,
} from "@/src/hooks/post";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/src/context/user.provider";
import { useGetMe } from "@/src/hooks/profile";
import { IPost, IUpdateVote } from "@/src/types";
import { toast } from "sonner";
import { useState } from "react";

const PostDetails = ({ id }: { id: string }) => {
  const [showModal, setShowModal] = useState(false);
  const { data: singlePost } = useGetSInglePost(id as string);

  const queryClient = useQueryClient();
  const { user } = useUser();
  const { data } = useGetMe(user?.email as string);
  const { mutate: handleAddVote } = useAddVote();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: addToBookmark } = useAddBookmark();

  const post = singlePost?.data;

  const favoritesPost: string[] | undefined = data?.data?.favorites?.map(
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
            queryClient.invalidateQueries({
              queryKey: [`SINGLE_POST${id}`],
            });
          },
        }
      );
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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <>
      <Modal
        size="5xl"
        scrollBehavior="inside"
        isOpen={showModal}
        onOpenChange={() => setShowModal(false)}
        placement="top-center"
      >
        <GTForm onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create a Post
                </ModalHeader>

                <ModalBody>
                  <h4 className="mt-2  p-1 text-2xl font-medium ">
                    {post?.title}
                  </h4>
                  <p className="absolute -top-0 right-1  px-2 text-tiny uppercase">
                    {user?._id === post?.user?._id && "My Post"}
                  </p>

                  <Image
                    removeWrapper
                    alt="Card example background"
                    className="h-[300px] w-full object-cover"
                    src={post?.imageUrl}
                  />

                  <div className="flex flex-row items-center justify-between w-full text-small mt-auto bg-[#a8b3cf33] py-2 rounded-md">
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
                        onClick={() => handleAddBookmark(post?._id as string)}
                        className="inline-flex cursor-pointer select-none flex-row
        items-center transition
        duration-200 ease-in-out justify-center font-bold y h-8 w-8 p-0 rounded-10 "
                      >
                        {favoritesPost?.includes(post?._id as string) ? (
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
                        onClick={() => handleDeletePost(post?._id as string)}
                        className="inline-flex cursor-pointer select-none flex-row
          items-center  transition
          duration-200 ease-in-out justify-center font-boldh-8 w-8 p-0 rounded-10"
                      >
                        <DeleteIcon className="text-[#e04337]" />
                      </button>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <Input
                      size="sm"
                      label="Comment"
                      name="comment"
                      type="text"
                    />
                    <Button
                      // isLoading={isPending && !isSuccess ? true : false}
                      type="submit"
                      size="lg"
                    >
                      Comment
                    </Button>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </GTForm>
      </Modal>
    </>
  );
};

export default PostDetails;

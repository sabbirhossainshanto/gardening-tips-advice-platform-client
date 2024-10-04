/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeletePost } from "@/src/hooks/post";
import { IPost } from "@/src/types";
import handleCopyPostURL from "@/src/utils/handleCopyPostURL";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";
import { Options } from "react-to-pdf";
import { useShowUpdatePostModal } from "@/src/store/updatePostModal";

interface IProps {
  post: IPost;
  toPDF: (options?: Options) => void;
}

export default function PostActions({ post, toPDF }: IProps) {
  const [_showModal, setShowModal] = useShowUpdatePostModal();
  const queryClient = useQueryClient();
  const { query, user } = useUser();
  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = (id: string) => {
    deletePost(id, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [`GET_ALL_POST`, query] });
      },
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <MoreVerticalIcon cursor="pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => setShowModal(true)} key="update">
          Update Post
        </DropdownItem>
        <DropdownItem onClick={() => handleCopyPostURL(post?._id)} key="copy">
          Copy Link
        </DropdownItem>
        <DropdownItem onClick={() => toPDF()} key="pdf">
          Generate PDF
        </DropdownItem>
        {user?._id === post?.user?._id || user?.role === "ADMIN" ? (
          <DropdownItem
            className="text-danger"
            color="danger"
            onClick={() => handleDeletePost(post?._id)}
            key="delete"
          >
            Delete Post
          </DropdownItem>
        ) : (
          <></>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

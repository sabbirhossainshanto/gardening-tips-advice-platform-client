import { IComment } from "@/src/types/comment";
import { Image } from "@nextui-org/image";
import React, { ReactNode, useState } from "react";
import { DeleteIcon, EditIcon } from "../../icons";
import EditComment from "../../modal/EditComment";
import { useDeleteComment } from "@/src/hooks/comment";
import { useQueryClient } from "@tanstack/react-query";

const Comment = ({ comment }: { comment: IComment }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState("");
  const { mutate: handleDeleteComment } = useDeleteComment();
  const handleOpenEditModal = (id: string) => {
    setCommentId(id);
    setIsModalOpen(true);
  };

  const deleteComment = (id: string) => {
    handleDeleteComment(id, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["get_comments"] });
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      {isModalOpen && (
        <EditComment
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          commentId={commentId}
        />
      )}
      <div className="h-[120px] border border-gray-700 rounded-md p-5">
        <div className="flex items-center gap-4">
          <Image
            className="size-8 object-cover object-center"
            src={comment?.user?.profilePhoto}
          />
          <div>
            <h6>{comment?.user?.name}</h6>
            <p className="text-xs text-foreground">{comment?.user?.email}</p>
          </div>
        </div>
        <h4 className="mt-3">{comment?.comment}</h4>
        <div className="flex items-center gap-4">
          <button
            onClick={() => deleteComment(comment?._id)}
            className="mt-3 text-default-400 cursor-pointer active:opacity-50"
          >
            <DeleteIcon className="text-[#e04337]" />
          </button>
          <button
            onClick={() => handleOpenEditModal(comment?._id)}
            className="mt-3 text-default-400 cursor-pointer active:opacity-50"
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Comment;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useEditComment, useGetSingleComment } from "@/src/hooks/comment";
import { useUser } from "@/src/context/user.provider";
import { useQueryClient } from "@tanstack/react-query";

interface IEditCommentProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
}

const EditComment = ({
  commentId,
  isModalOpen,
  setIsModalOpen,
}: IEditCommentProps) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { reset, register, handleSubmit } = useForm();
  const { data } = useGetSingleComment(commentId);
  const { mutate: handleEditComment } = useEditComment();

  const onSubmit: SubmitHandler<FieldValues> = (fieldValue) => {
    const editCommentData = {
      id: data?.data?._id,
      data: {
        ...fieldValue,
        post: data?.data?.post,
        user: user?._id,
      },
    };
    handleEditComment(editCommentData, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["get_comment"] });
        setIsModalOpen(false);
      },
    });
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        comment: data?.data?.comment,
      });
    }
  }, [data?.data, reset]);

  if (!data?.data) {
    return;
  }

  return (
    <>
      <Modal
        size="xs"
        scrollBehavior="inside"
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        placement="top-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Comment
                </ModalHeader>

                <ModalBody>
                  <Input
                    {...register("comment")}
                    label="Comment"
                    name="comment"
                    type="text"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    // isLoading={isPending && !isSuccess ? true : false}
                    type="submit"
                    color="primary"
                  >
                    Edit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditComment;

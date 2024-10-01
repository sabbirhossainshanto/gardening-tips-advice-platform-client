/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { LockIcon, MailIcon } from "../icons";
import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useShowCreatePostModal } from "@/src/store/showCreatePostModal";

const CreatePost = () => {
  const [showCreatePostModal, setShowCreatePostModal] =
    useShowCreatePostModal();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Button onPress={() => setShowCreatePostModal(true)}>Open</Button>
      <Modal
        size="5xl"
        scrollBehavior="inside"
        isOpen={showCreatePostModal}
        onOpenChange={() => setShowCreatePostModal(false)}
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
                  <GTInput
                    label="Email"
                    name="email"
                    type="email"
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  <GTInput
                    label="Password"
                    name="password"
                    type="password"
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => setShowCreatePostModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    // isLoading={isPending && !isSuccess ? true : false}
                    type="submit"
                    color="primary"
                  >
                    Sign in
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

export default CreatePost;

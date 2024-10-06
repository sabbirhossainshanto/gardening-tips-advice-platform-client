"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUser } from "@/src/context/user.provider";
import { useForgotPassword } from "@/src/hooks/auth";

import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { useShowForgotPasswordModal } from "@/src/store/showForgotPassword";

const ForgotPassword = () => {
  const [showModal, setShowModal] = useShowForgotPasswordModal();
  const { setIsLoading: userLoading, user } = useUser();

  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    forgotPassword(data, {
      onSuccess() {
        setShowModal(false);
      },
    });
    userLoading(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        onOpenChange={closeModal}
        isOpen={showModal}
        placement="top-center"
      >
        <GTForm onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Forgot Password
                </ModalHeader>

                <ModalBody>
                  <GTInput label="Email" name="email" type="email" />
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={closeModal}>
                    Close
                  </Button>
                  <Button
                    isLoading={isPending && !isSuccess ? true : false}
                    type="submit"
                    color="primary"
                  >
                    Get Mail
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

export default ForgotPassword;

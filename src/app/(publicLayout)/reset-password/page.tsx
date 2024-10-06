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

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useResetPassword } from "@/src/hooks/auth";
import { useRouter, useSearchParams } from "next/navigation";
import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { toast } from "sonner";

const ResetPassword = () => {
  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const router = useRouter();

  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const resetPasswordData = {
      data: {
        email,
        ...data,
      },
      token,
    };

    resetPassword(resetPasswordData, {
      onSuccess(data) {
        toast.success(data?.message);
        router.push("/");
      },
    });
  };

  const closeModal = () => {
    router.push("/");
  };

  return (
    <>
      <Modal
        //   onOpenChange={closeModal}
        isOpen={true}
        placement="top-center"
      >
        <GTForm onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Reset Password
                </ModalHeader>

                <ModalBody>
                  <GTInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                  />
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
                    Reset Password
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

export default ResetPassword;

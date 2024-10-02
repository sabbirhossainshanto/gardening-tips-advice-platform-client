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
import { LockIcon } from "../icons";
import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUser } from "@/src/context/user.provider";
import { useChangePasswordModal } from "@/src/store/showChangePassword";
import { useChangePassword } from "@/src/hooks/auth";
import { toast } from "sonner";
import { logOut } from "@/src/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoute } from "@/src/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordValidationSchema } from "@/src/schemas/login.validation";

const ChangePassword = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [changePassword, setChangePassword] = useChangePasswordModal();
  const { setIsLoading: userLoading } = useUser();
  const {
    mutate: handleChangePassword,
    isPending,
    isSuccess,
  } = useChangePassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data?.newPassword !== data?.confirmNewPassword) {
      return toast.error("New Password and confirm new password not matched!");
    }
    const payloadData = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };

    handleChangePassword(payloadData, {
      onSuccess: (data) => {
        if (data?.success) {
          logOut();
          userLoading(true);
          if (protectedRoute.some((route) => pathname.match(route))) {
            router.push("/");
          }
          setChangePassword(false);
        }
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={changePassword}
        onOpenChange={() => setChangePassword(false)}
        placement="top-center"
      >
        <GTForm
          resolver={zodResolver(changePasswordValidationSchema)}
          onSubmit={onSubmit}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Change Password
                </ModalHeader>

                <ModalBody>
                  <GTInput
                    label="Old Password"
                    name="oldPassword"
                    type="password"
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  <GTInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  <GTInput
                    label="Confirm New Password"
                    name="confirmNewPassword"
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
                    onPress={() => setChangePassword(false)}
                  >
                    Close
                  </Button>
                  <Button
                    isLoading={isPending && !isSuccess ? true : false}
                    type="submit"
                    color="primary"
                  >
                    Change Password
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

export default ChangePassword;

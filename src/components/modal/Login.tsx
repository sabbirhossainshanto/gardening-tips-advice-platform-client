"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { LockIcon, MailIcon } from "../icons";
import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth";
import { useEffect } from "react";
import { loginValidationSchema } from "@/src/schemas/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      onClose();
    }
  }, [isPending, isSuccess]);

  return (
    <>
      <Button
        className="text-sm font-normal text-default-600 bg-default-100"
        variant="flat"
        onPress={onOpen}
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <GTForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
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

                  <div className="flex py-2 px-1 justify-end">
                    <span className="text-sm">
                      <span>{"Don't"} have any account? </span>
                      <Link
                        size="md"
                        color="primary"
                        className="cursor-pointer"
                      >
                        Register
                      </Link>
                    </span>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary">
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

export default Login;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
import { useShowRegisterModal } from "@/src/store/showRegister";
import { useShowLoginModal } from "@/src/store/showLogin";
import { useQueryClient } from "@tanstack/react-query";
import { useShowForgotPasswordModal } from "@/src/store/showForgotPassword";

const Login = () => {
  const queryClient = useQueryClient();
  const [_showRegister, setShowRegister] = useShowRegisterModal();
  const [_showForgotPassword, setShowForgotPassword] =
    useShowForgotPasswordModal();
  const [showLogin, setShowLogin] = useShowLoginModal();
  const { setIsLoading: userLoading, query } = useUser();

  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [`GET_ALL_POST`, query] });
      },
    });
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      setShowLogin(false);
    }
  }, [isPending, isSuccess]);

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleShowForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  return (
    <>
      <Modal
        isOpen={showLogin}
        onOpenChange={() => setShowLogin(false)}
        placement="top-center"
      >
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

                  <div className="flex py-2 px-1 justify-between">
                    <span className="text-sm">
                      <Link
                        onClick={handleShowForgotPassword}
                        color="danger"
                        className="cursor-pointer text-xs"
                      >
                        Forgot Password?
                      </Link>
                    </span>
                    <span className="text-xs">
                      <span>{"Don't"} have any account? </span>
                      <Link
                        onClick={handleShowRegister}
                        color="primary"
                        className="cursor-pointer text-[12.5px]"
                      >
                        Register
                      </Link>
                    </span>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => setShowLogin(false)}
                  >
                    Close
                  </Button>
                  <Button
                    isLoading={isPending && !isSuccess ? true : false}
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

export default Login;

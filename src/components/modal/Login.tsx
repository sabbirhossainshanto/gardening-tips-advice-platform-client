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

const Login = () => {
  const [_showRegister, setShowRegister] = useShowRegisterModal();
  const [showLogin, setShowLogin] = useShowLoginModal();

  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
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

  return (
    <>
      <Modal
        isOpen={showLogin}
        onOpenChange={() => setShowLogin(false)}
        placement="top-center"
      >
        <GTForm
          //! Only for development
          defaultValues={{
            email: "sabbir@gmail.com",
            password: "123456",
          }}
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
                        onClick={handleShowRegister}
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

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
import { useUserRegister } from "@/src/hooks/auth";
import { useEffect } from "react";
import { useShowRegisterModal } from "@/src/store/showRegister";
import { useShowLoginModal } from "@/src/store/showLogin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const queryClient = useQueryClient();
  const [_showLogin, setShowLogin] = useShowLoginModal();
  const [showRegister, setShowRegister] = useShowRegisterModal();
  const { setIsLoading: userLoading, query } = useUser();

  const { mutate: handleRegister, isPending, isSuccess } = useUserRegister();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data?.password !== data?.confirmPassword) {
      return toast.error("Password did not matched!");
    }
    const registerData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };
    handleRegister(registerData, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [`GET_ALL_POST`, query] });
      },
    });
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      setShowRegister(false);
    }
  }, [isPending, isSuccess]);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <>
      <Modal
        isOpen={showRegister}
        onOpenChange={() => setShowRegister(false)}
        placement="top-center"
      >
        <GTForm onSubmit={onSubmit}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register
              </ModalHeader>

              <ModalBody>
                <GTInput label="Name" name="name" type="text" />
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
                <GTInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <GTInput
                  label="Mobile Number"
                  name="mobileNumber"
                  type="number"
                />

                <div className="flex py-2 px-1 justify-end">
                  <span className="text-sm">
                    <span>Already have an account? </span>
                    <Link
                      onClick={handleShowLogin}
                      size="md"
                      color="primary"
                      className="cursor-pointer"
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => setShowRegister(false)}
                >
                  Close
                </Button>
                <Button
                  isLoading={isPending && !isSuccess ? true : false}
                  type="submit"
                  color="primary"
                >
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </GTForm>
      </Modal>
    </>
  );
};

export default Register;

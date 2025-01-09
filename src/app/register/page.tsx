"use client";

import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { useUser } from "@/src/context/user.provider";
import { useUserRegister } from "@/src/hooks/auth";
import { Button } from "@nextui-org/button";
import { useQueryClient } from "@tanstack/react-query";
import { LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const queryClient = useQueryClient();
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

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="hidden xl:block  p-0 h-[100vh] bg-cover bg-no-repeat col-span-5">
          <img
            className="w-full h-full"
            src="https://uitheme.shop/sociala/images/login-bg-2.jpg"
            alt=""
          />
        </div>
        <div className="h-[100vh] flex items-center bg-white rounded-3 overflow-hidden col-span-7">
          <div className="w-full max-w-[500px] mx-auto">
            <h2 className="font-bold text-4xl md:text-5xl mb-4 ">
              Create <br /> your account
            </h2>
            <GTForm onSubmit={onSubmit}>
              <div className="mb-3">
                <GTInput label="Name" name="name" type="text" />
              </div>
              <div className="form-group relative mb-3">
                <GTInput
                  label="Email"
                  name="email"
                  type="email"
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
              <div className="form-group relative mb-3">
                <GTInput
                  label="Password"
                  name="password"
                  type="password"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
              <div className="mb-3">
                <GTInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
              <div className="mb-3">
                <GTInput
                  label="Mobile Number"
                  name="mobileNumber"
                  type="number"
                />
              </div>
              <div className="form-check flex items-center mb-3">
                <input
                  type="checkbox"
                  className="form-check-input mt-1"
                  id="exampleCheck2"
                  defaultChecked
                />
                <label
                  htmlFor="exampleCheck2"
                  className="text-sm text-gray-500 ml-2"
                >
                  Accept Terms and Conditions
                </label>
              </div>
              <div className="mb-3">
                <Button
                  className="block text-center bg-black text-white font-medium py-2 rounded-lg w-full"
                  isLoading={isPending && !isSuccess ? true : false}
                  type="submit"
                  color="primary"
                >
                  Sign Up
                </Button>
              </div>
            </GTForm>
            <div className=" p-0 text-left">
              <h6 className="text-gray-500 text-sm font-medium mt-0 mb-0">
                Already have an account?{" "}
                <Link href="/login" className="font-bold ml-1">
                  Login
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

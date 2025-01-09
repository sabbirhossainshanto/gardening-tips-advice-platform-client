"use client";

import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth";
import { loginValidationSchema } from "@/src/schemas/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useQueryClient } from "@tanstack/react-query";
import { LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsLoading: userLoading, query } = useUser();

  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data, {
      onSuccess() {
        router.push("/");
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
            src="https://uitheme.shop/sociala/images/login-bg.jpg"
            alt=""
          />
        </div>
        <div className="h-[100vh] flex items-center bg-white rounded-3 overflow-hidden col-span-7">
          <div className="card shadow-none border-0 mx-auto">
            <div className="card-body text-left">
              <h2 className="font-bold text-4xl md:text-5xl mb-4 ">
                Login <br /> into your account
              </h2>
              <GTForm
                resolver={zodResolver(loginValidationSchema)}
                onSubmit={onSubmit}
              >
                <div className="mb-3">
                  <GTInput
                    label="Email"
                    name="email"
                    type="email"
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <div className="mb-3">
                  <GTInput
                    label="Password"
                    name="password"
                    type="password"
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
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
                    Sign in
                  </Button>
                </div>
              </GTForm>
              <div className="p-0 text-left">
                <h6 className="text-gray-500 text-sm font-medium mt-0 mb-0">
                  {"Don't"} have account?{" "}
                  <Link href="/register" className="font-bold ml-1">
                    Register
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

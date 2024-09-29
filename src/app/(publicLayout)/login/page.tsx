"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/shared/Loading";

import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth";
import { loginValidationSchema } from "@/src/schemas/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { FieldValues, SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const {setIsLoading:userLoading} = useUser()
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const router = useRouter();
  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
    userLoading(true)
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
            //! Only for development
            defaultValues={{
              email: "mir@gmail.com",
              password: "123456",
            }}
          >
            <div className="py-3">
              <FXInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>
          <div className="text-center">
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

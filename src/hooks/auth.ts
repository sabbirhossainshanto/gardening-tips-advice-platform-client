"use client";

import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user_registration"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user_login"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["change_password"],
    mutationFn: async (userData) => await changePassword(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useForgotPassword = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["forgot_password"],
    mutationFn: async (payload) => await forgotPassword(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useResetPassword = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["reset_password"],
    mutationFn: async (payload) => await resetPassword(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

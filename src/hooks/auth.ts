import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, loginUser, registerUser } from "../services/AuthService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user_registration"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful!");
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
    onSuccess: () => {
      toast.success("User login successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMe = () => {
  return useQuery<any, Error, FieldValues>({
    queryKey: ["user"],
    queryFn: async () => await getMe(),
  });
};

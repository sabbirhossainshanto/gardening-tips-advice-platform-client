import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { updateProfile, verifyProfile } from "../services/Profile";
import { toast } from "sonner";
import { getMe } from "../services/AuthService";
import { IUser } from "../types";

interface IProfile {
  success: boolean;
  message: string;
  data: IUser;
}

export const useUpdateProfile = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["update_profile"],
    mutationFn: async (userData) => await updateProfile(userData),
    onSuccess: () => {
      toast.success("Profile updated successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMe = () => {
  return useQuery<any, Error, IProfile>({
    queryKey: ["user"],
    queryFn: async () => await getMe(),
  });
};

export const useVerifyProfile = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["verify_profile"],
    mutationFn: async (payload) => await verifyProfile(payload),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { updateProfile } from "../services/Profile";
import { toast } from "sonner";
import { getMe } from "../services/AuthService";

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
  return useQuery<any, Error, FieldValues>({
    queryKey: ["user"],
    queryFn: async () => await getMe(),
  });
};

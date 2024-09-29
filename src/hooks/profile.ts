import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { updateProfile } from "../services/Profile";
import { toast } from "sonner";

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

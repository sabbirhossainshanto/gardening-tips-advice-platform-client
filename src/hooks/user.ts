import { useMutation, useQuery } from "@tanstack/react-query";
import { IUpdateUserData, IUser } from "../types";
import { getAllUsers, updateUser } from "../services/User";
import { toast } from "sonner";

interface IUsersResponseType {
  success: boolean;
  message: string;
  data: IUser[];
}

export const useGetAllUsers = () => {
  return useQuery<IUsersResponseType>({
    queryKey: ["all-users"],
    queryFn: async () => await getAllUsers(),
  });
};
export const useUpdateUser = () => {
  return useMutation<any, Error, IUpdateUserData>({
    mutationKey: ["user"],
    mutationFn: async (payload) => await updateUser(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
